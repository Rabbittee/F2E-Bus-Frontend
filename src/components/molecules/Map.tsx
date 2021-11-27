import { MapContainer, TileLayer } from "react-leaflet";
import type * as Type from "leaflet";
import { ReactNode, useState, useEffect } from "react";
import { MAP_TOKEN } from "@/config";
import { clamp } from "ramda";
import "leaflet-edgebuffer";

declare module "react-leaflet" {
  interface TileLayerProps {
    edgeBufferTiles: number;
  }
}

const TILE_SIZE = 512;
const MAX_ZOOM = 18;

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
        keepBuffer={10}
        edgeBufferTiles={1}
        id="mapbox/light-v10"
        accessToken={MAP_TOKEN}
      />
    );
  },
};

type MapProps = {
  id?: string;
  className?: string;
  bounds?: Type.LatLngBounds;
  center?: Type.LatLngLiteral;
  zoom?: number;
  children?: ReactNode;
};
export function Map({
  id,
  className,
  center,
  bounds,
  zoom = MAX_ZOOM / 2,
  children,
}: MapProps) {
  const [map, setMap] = useState<Type.Map>();
  const _zoom = clamp(0, MAX_ZOOM, zoom);

  useEffect(() => {
    if (!map) return;

    if (center) {
      return void map.setView(center, _zoom, { animate: true });
    }

    if (bounds) {
      return void map.fitBounds(bounds);
    }
  }, [map, _zoom, center, bounds]);

  return (
    <div id={id} className={className}>
      <MapContainer
        className="h-full w-full rounded-3xl overflow-hidden z-0"
        whenCreated={setMap}
        attributionControl={false}
      >
        <Tile.MapBox />

        {children}
      </MapContainer>
    </div>
  );
}
