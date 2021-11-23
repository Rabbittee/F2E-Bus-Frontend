import { Geo } from "@/models";
import { lerp } from "@/utils";
import { MapContainer, TileLayer } from "react-leaflet";
import type * as Type from "leaflet";
import { ReactNode, useState, useEffect } from "react";
import { MAP_TOKEN } from "@/config";

const Tile = {
  MapBox() {
    return (
      <TileLayer
        url={
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        }
        tileSize={512}
        maxZoom={18}
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
  center?: Geo.Position;
  bbox?: Geo.BoundingBox;
  zoom?: number;
  children?: ReactNode;
};
export function Map({
  className,
  center = { lat: 23.6978, lon: 120.9605 },
  bounds,
  bbox,
  zoom = 50,
  children,
}: MapProps) {
  const [map, setMap] = useState<Type.Map>();

  useEffect(() => {
    if (!map) return;

    if (bbox) {
      const { top, bottom, left, right } = bbox;

      zoom = map.getBoundsZoom([
        [top, left],
        [bottom, right],
      ]);
    }

    if (!center) return;

    const { lat, lon } = center;
    map.setView([lat, lon], zoom, { animate: true });

    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, center, zoom, bbox, bounds]);

  return (
    <div className={className}>
      <MapContainer
        zoom={lerp(0, 18, zoom / 100)}
        className="h-full w-full rounded-3xl overflow-hidden"
        whenCreated={setMap}
      >
        <Tile.MapBox />

        {children}
      </MapContainer>
    </div>
  );
}
