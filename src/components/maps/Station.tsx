import {
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Icon } from "leaflet";
import { Marker, useMap } from "react-leaflet";
import { Stop } from "@/models";

import type { Props } from "./Tooltip";

function getTooltipOffsetHeight(icon: Icon) {
  const [, iconHeight] = icon.options.iconSize as [number, number];

  return -1 * (iconHeight - 15);
}

interface ZoomStatus {
  max: number;
  current: number;
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

  const element = typeof tooltip === "function" ? tooltip(zoom) : tooltip;

  return (
    <Marker
      icon={icon}
      position={stop.position}
      eventHandlers={{
        click: () => onClick?.(stop),
      }}
    >
      {isValidElement(element) &&
        cloneElement(element, {
          offset: getTooltipOffsetHeight(icon),
        } as Props)}
    </Marker>
  );
}
