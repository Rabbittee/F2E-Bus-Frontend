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
    <div className="flex-1 flex flex-col">
      <Map className="w-full h-[32vh] px-2 my-2" center={data?.position}>
        {data?.position && (
          <Marker
            icon={Icon.Leaflet.LocationActive}
            position={[data.position.lat, data.position.lon]}
          />
        )}
      </Map>

      <List
        classes={{
          wrapper: "px-8 py-2 text-lg text-white space-y-4",
          list: "max-h-96 overflow-auto px-2 pb-2 dark-green-scroll",
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
              <strong className="text-dark-green">
                {departure} — {destination}
              </strong>
            </Item.WithTitle>
          </Link>
        )}
      </List>
    </div>
  );
}
