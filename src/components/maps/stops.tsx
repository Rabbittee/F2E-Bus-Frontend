import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";

import { Stop } from "@/models";

type Props = {
  stops?: Stop[];
  icon: Icon;
  onClick?: (station: Stop) => void;
};
export function Stations({ stops, icon, onClick }: Props) {
  const map = useMap();

  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const zoom = () => setZoom(map.getZoom());

    map.addEventListener("zoom", zoom);
    return () => void map.removeEventListener("zoom", zoom);
  }, [map, setZoom]);

  const diff = map.getMaxZoom() - zoom;

  const showMarker = true;
  const showStationName = diff <= 3;

  const [, iconHeight] = icon.options.iconSize as [number, number];
  const offsetHeight = -1 * (iconHeight - 10);

  return (
    <>
      {showMarker &&
        stops?.map((stop, index) => (
          <Marker
            key={String(stop.id)}
            icon={icon}
            position={stop.position}
            eventHandlers={{
              click: () => onClick?.(stop),
            }}
          >
            <Tooltip direction="top" offset={[0, offsetHeight]} permanent>
              <span>{index + 1}</span>

              {showStationName && <span>{stop.name}</span>}
            </Tooltip>
          </Marker>
        ))}
    </>
  );
}
