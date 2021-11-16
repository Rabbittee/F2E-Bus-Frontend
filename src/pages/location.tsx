import { Map, List, Icon } from "@/components";
import { API, Query, useSelector } from "@/logic";
import { Geo } from "@/models";
import { URLSearchParams } from "@/utils";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import type * as Type from "leaflet";
import { Marker } from "react-leaflet";
import clsx from "clsx";

type BaseProps = PropsWithChildren<{
  className?: string;
}>;
function Item({ children, className }: BaseProps) {
  return (
    <div className={clsx("px-4 py-2 rounded-full bg-cyan-dark", className)}>
      {children}
    </div>
  );
}

export function Location() {
  const navigate = useNavigate();

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
    if (!map || !data?.bbox) return;

    const { top, bottom, left, right } = data.bbox;
    const zoom = map.getBoundsZoom([
      [top, left],
      [bottom, right],
    ]);

    map.setView([center.lat, center.lon], zoom, { animate: true });
  }, [map, center, data?.bbox]);

  if (!data) return <></>;

  const query = String(params.get("query"));
  const { stations } = data;

  const nearby = stations.some(({ name }) => name === query);

  return (
    <div className="flex-1 flex flex-col">
      <Map className="w-full h-[50vh] px-2 my-2" mounted={setMap}>
        {stations.map((station) => (
          <Marker
            key={station.id}
            icon={Icon.Leaflet.Location}
            position={[station.position.lat, station.position.lon]}
            eventHandlers={{
              click: () =>
                navigate({
                  search: URLSearchParams({
                    query: station.name,
                    lat: station.position.lat,
                    lon: station.position.lon,
                  }),
                }),
            }}
          />
        ))}
      </Map>

      <List
        classes={{
          wrapper: "px-8 py-2 text-lg text-white space-y-4",
          list: "max-h-56 overflow-auto pr-2 cyan-dark-scroll",
        }}
        title={
          <strong className="text-2xl text-cyan-dark">
            {nearby ? "這附近的站牌" : "我可能想查"}
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
            <Item className="flex flex-col">
              <strong className="text-sm">{item.name}</strong>

              {nearby || <small className="text-xs">{item.address}</small>}
            </Item>
          </Link>
        )}
      </List>
    </div>
  );
}
