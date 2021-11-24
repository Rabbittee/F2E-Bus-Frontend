import { ReactNode, useEffect, useState } from "react";
import { Icon } from "leaflet";
import { Marker, Tooltip, useMap } from "react-leaflet";

import { Stop } from "@/models";

interface ZoomStatus {
  max: number;
  current: number;
}

function getTooltipOffsetHeight(icon: Icon) {
  const [, iconHeight] = icon.options.iconSize as [number, number];

  return -1 * (iconHeight - 10);
}

type StationProps = {
  stop: Stop;
  icon: Icon;
  onClick?: (station: Stop) => void;
  tooltip?: ((zoom: ZoomStatus) => ReactNode) | ReactNode;
  showIndex?: (zoom: ZoomStatus) => boolean;
  showStationName?: (zoom: ZoomStatus) => boolean;
};
export function Station({ stop, icon, onClick, tooltip }: StationProps) {
  const map = useMap();

  const [current, setZoom] = useState(map.getZoom());
  useEffect(() => {
    const zoom = () => setZoom(map.getZoom());

    map.addEventListener("zoom", zoom);
    return () => void map.removeEventListener("zoom", zoom);
  }, [map, setZoom]);

  const zoom = {
    max: map.getMaxZoom(),
    current,
  };

  return (
    <Marker
      icon={icon}
      position={stop.position}
      eventHandlers={{
        click: () => onClick?.(stop),
      }}
    >
      {tooltip && (
        <Tooltip
          direction="top"
          offset={[0, getTooltipOffsetHeight(icon)]}
          permanent
        >
          {typeof tooltip === "function" ? tooltip(zoom) : tooltip}
        </Tooltip>
      )}
    </Marker>
  );
}
