import { MapContainer, TileLayer } from "react-leaflet";
import type * as Type from "leaflet";
import { ReactNode, useState, useEffect } from "react";
import { MAP_TOKEN } from "@/config";
import { clamp } from "ramda";

const TILE_SIZE = 512;
const MAX_ZOOM = 18;
const DEFAULT_CENTER = { lat: 23.6978, lng: 120.9605 };

const Tile = {
  MapBox() {
    return (
      <TileLayer
        url={
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        }
        tileSize={TILE_SIZE}
        maxZoom={MAX_ZOOM}
        zoomOffset={-1}
        id="mapbox/streets-v11"
        accessToken={MAP_TOKEN}
      />
    );
  },
};

type MapProps = {
  className?: string;
  bounds?: Type.LatLngBounds;
  center?: Type.LatLngLiteral;
  zoom?: number;
  children?: ReactNode;
};
export function Map({
  className,
  center = DEFAULT_CENTER,
  bounds,
  zoom = MAX_ZOOM / 2,
  children,
}: MapProps) {
  const [map, setMap] = useState<Type.Map>();
  const _zoom = clamp(0, MAX_ZOOM, zoom);

  useEffect(() => {
    if (!map) return;

    if (bounds) {
      return void map.fitBounds(bounds);
    }

    if (center) {
      return void map.setView(center, _zoom, { animate: true });
    }
  }, [map, _zoom, center, bounds]);

  return (
    <div className={className}>
      <MapContainer
        className="h-full w-full rounded-3xl overflow-hidden"
        whenCreated={setMap}
      >
        <Tile.MapBox />

        {children}
      </MapContainer>
    </div>
  );
}
