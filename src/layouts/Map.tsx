import { useEffect, useState } from "react";
import { latLng, latLngBounds } from "leaflet";
import { Marker, Polyline, useMap } from "react-leaflet";

import { Icon, Map } from "@/components";
import { Stop } from "@/models";
import { API, Params, SearchParams } from "@/logic";
import clsx from "clsx";

type StopsProps = {
  stops?: Stop[];
};
function Stops({ stops }: StopsProps) {
  const map = useMap();

  const canShow = () => map.getMaxZoom() - map.getZoom() <= 4;

  const [show, setShow] = useState(canShow());

  useEffect(() => {
    const zoom = () => setShow(canShow());

    map.addEventListener("zoom", zoom);

    return () => void map.removeEventListener("zoom", zoom);
  }, [map]);

  if (!show) return <></>;

  return (
    <>
      {stops?.map((stop) => (
        <Marker
          key={String(stop.id)}
          icon={Icon.Leaflet.Location}
          position={stop.position}
        />
      ))}
    </>
  );
}

type RouteMapProps = {
  className?: string;
};
export default function RouteMap({ className }: RouteMapProps) {
  const id = Params.useID();
  const direction = SearchParams.useDirection();

  const { data: stops } = API.useGetRouteStopsQuery(
    { id, direction },
    { skip: !id }
  );

  const points = stops && stops.map(({ position }) => latLng(position));

  const bounds = points && latLngBounds(points);

  return (
    <Map className={clsx("w-full px-2 my-2", className)} bounds={bounds}>
      <Stops stops={stops} />

      {points && <Polyline positions={points} />}
    </Map>
  );
}
