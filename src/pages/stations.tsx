import { Map, List, Icon } from "@/components";
import { API } from "@/logic";
import { Route } from "@/models";
import { Link, useParams, Navigate } from "react-router-dom";
import { Marker } from "react-leaflet";

function Item({ name, departure, destination }: Route) {
  return (
    <div className="flex flex-col rounded-xl shadow">
      <div className="flex justify-between bg-orange text-white p-3 rounded-t-xl items-center">
        <strong className="text-xl">{name}</strong>

        <small>7分鐘</small>
      </div>

      <strong className="p-3 rounded-b-xl text-cyan-dark">
        {departure} — {destination}
      </strong>
    </div>
  );
}

export function Stations() {
  const { id } = useParams<"id">();

  const { data } = API.useGetStationInformationQuery(id!, { skip: !id });

  if (!id) return <Navigate to="/" replace />;

  if (!data) return <></>;

  const { position } = data;

  return (
    <div className="flex-1 flex flex-col">
      <Map className="w-full h-[32vh] px-2 my-2" center={position}>
        <Marker
          icon={Icon.Leaflet.LocationActive}
          position={[position.lat, position.lon]}
        />
      </Map>

      <List
        classes={{
          wrapper: "px-8 py-2 text-lg text-white space-y-4",
          list: "max-h-96 overflow-auto px-2 pb-2 cyan-dark-scroll",
        }}
        title={<strong className="text-2xl text-orange">廣福國小站</strong>}
        items={data?.routes}
      >
        {(item) => (
          <Link to={{ pathname: `/routes/${String(item.id)}` }}>
            <Item {...item} />
          </Link>
        )}
      </List>
    </div>
  );
}
