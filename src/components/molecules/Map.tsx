import { Geo } from "@/models";
import { lerp } from "@/utils";
import { MapContainer, TileLayer } from "react-leaflet";
import type * as Type from "leaflet";
import { ReactNode, useState, useEffect } from "react";
import { MAP_TOKEN } from "@/config";

function MapBox(accessToken: string) {
  return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${accessToken}`;
}

function OpenStreetMap() {
  return `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`;
}

function URL() {
  if (MAP_TOKEN) {
    return MapBox(MAP_TOKEN);
  }

  return OpenStreetMap();
}

type MapProps = {
  className?: string;
  center?: Geo.Position;
  bbox?: Geo.BoundingBox;
  zoom?: number;
  children?: ReactNode;
};
export function Map({
  className,
  center,
  bbox,
  zoom = 50,
  children,
}: MapProps) {
  const [map, setMap] = useState<Type.Map>();

  useEffect(() => {
    if (!map || !center) return;

    if (bbox) {
      const { top, bottom, left, right } = bbox;

      zoom = map.getBoundsZoom([
        [top, left],
        [bottom, right],
      ]);
    }

    const { lat, lon } = center;
    map.setView([lat, lon], zoom, { animate: true });
  }, [map, center, zoom, bbox]);

  return (
    <div className={className}>
      <MapContainer
        center={[center?.lat || 0, center?.lon || 0]}
        zoom={lerp(0, 18, zoom / 100)}
        className="h-full w-full rounded-3xl overflow-hidden"
        whenCreated={setMap}
      >
        <TileLayer url={URL()} />

        {children}
      </MapContainer>
    </div>
  );
}
