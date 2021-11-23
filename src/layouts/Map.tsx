import { useEffect, useState } from "react";
import { latLng, latLngBounds } from "leaflet";
import { Marker, Polyline, Popup, Tooltip, useMap } from "react-leaflet";

import { Icon, Map } from "@/components";
import { Stop } from "@/models";
import { API, Params, SearchParams } from "@/logic";
import clsx from "clsx";
import { useNavigate } from "react-router";

type StopsProps = {
  stops: Stop[];
};
function Stops({ stops }: StopsProps) {
  const map = useMap();

  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const zoom = () => setZoom(map.getZoom());

    map.addEventListener("zoom", zoom);

    return () => void map.removeEventListener("zoom", zoom);
  }, [map, setZoom]);

  const diff = map.getMaxZoom() - zoom;

  const showMarker = diff <= 4;
  const showStationName = diff <= 3;

  return (
    <>
      {showMarker &&
        stops.map((stop, index) => (
          <Marker
            key={String(stop.id)}
            icon={Icon.Leaflet.Location}
            position={stop.position}
            eventHandlers={{
              click: () =>
                document.getElementById(String(stop.id))?.scrollIntoView(),
            }}
          >
            <Tooltip direction="top" offset={[0, -28]} permanent>
              <span>{index + 1}</span>

              {showStationName && <span>{stop.name}</span>}
            </Tooltip>
          </Marker>
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
      {stops && <Stops stops={stops} />}

      {points && <Polyline positions={points} />}
    </Map>
  );
}
