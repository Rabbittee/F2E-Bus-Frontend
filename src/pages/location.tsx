import { Map, List } from "@/components";
import { API, Query, useSelector } from "@/logic";
import { Geo } from "@/models";
import { URLSearchParams } from "@/utils";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import type * as Type from "leaflet";

function Item({ children }: PropsWithChildren<{}>) {
  return (
    <div className="px-4 py-2 rounded-full bg-cyan-dark font-bold">
      {children}
    </div>
  );
}

export function Location() {
  const [params] = useSearchParams({
    query: useSelector(Query.selectQuery),
  });

  const { data } = API.useGetRecommendQueryQuery(
    {
      query: String(params.get("query")),
      use_geocode_api: true,
      with_bounding_center: true,
    },
    { skip: !params.get("query") }
  );

  const center = useMemo<Geo.Position>(
    () => ({
      lat: Number(params.get("lat")),
      lon: Number(params.get("lon")),
    }),
    [params]
  );

  const [map, setMap] = useState<Type.Map>();

  useEffect(() => {
    if (!map) return;

    map.panTo([center.lat, center.lon]);
  }, [map, center]);

  if (!data) return <></>;

  const query = String(params.get("query"));
  const { stations } = data;

  const matchLocation = stations.find(({ name }) => name === query);

  return (
    <div className="flex-1 flex flex-col">
      <Map className="w-full h-[50vh] px-2 my-2" zoom={100} mounted={setMap} />

      <List
        classes={{
          wrapper: "px-8 py-2 text-lg text-white space-y-4",
          list: "max-h-56 overflow-auto pr-2 cyan-dark-scroll",
        }}
        title={
          <strong className="text-2xl text-cyan-dark">
            {matchLocation ? "附近的站牌" : "選擇查詢地點"}
          </strong>
        }
        items={stations}
      >
        {(item) => (
          <Link
            to={{
              search: URLSearchParams({
                query: item.name,
                lat: item.position.lat,
                lon: item.position.lon,
              }),
            }}
          >
            <Item>{item.name}</Item>
          </Link>
        )}
      </List>
    </div>
  );
}
