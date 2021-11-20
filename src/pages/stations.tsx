import { Link, useParams, Navigate } from "react-router-dom";
import { Marker } from "react-leaflet";

import { Map, List, Icon, Item } from "@/components";
import { API } from "@/logic";
import { URLSearchParams } from "@/utils";

export function Stations() {
  const { id } = useParams<"id">();
  const { data } = API.useGetStationInformationQuery(id!, { skip: !id });

  if (!id) return <Navigate to="/" replace />;

  return (
    <div className="flex-1 flex md:flex-row flex-col">
      <Map
        className="w-full md:h-[84vh] h-[32vh] px-2 my-2 md:flex-[8]"
        center={data?.position}
      >
        {data?.position && (
          <Marker
            icon={Icon.Leaflet.LocationActive}
            position={[data.position.lat, data.position.lon]}
          />
        )}
      </Map>

      <List
        classes={{
          wrapper: "md:px-2 px-8 py-2 text-lg text-white space-y-4 md:flex-[4]",
          list: "md:max-h-[78vh] max-h-56 overflow-auto pr-2 orange-scroll",
        }}
        title={<strong className="text-2xl text-orange">{data?.name}</strong>}
        items={data?.routes}
      >
        {({ id, name, departure, destination }) => (
          <Link
            to={{
              pathname: `/routes/${String(id)}`,
              search: URLSearchParams({ query: name }),
            }}
          >
            <Item.WithTitle
              title={
                <div className="flex justify-between">
                  <strong className="text-xl">{name}</strong>

                  <small>7分鐘</small>
                </div>
              }
            >
              <strong className="text-orange">
                {departure} — {destination}
              </strong>
            </Item.WithTitle>
          </Link>
        )}
      </List>
    </div>
  );
}
