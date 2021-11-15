import { Geo } from "@/models";
import { lerp } from "@/utils";
import { MapContainer, TileLayer } from "react-leaflet";
import type * as Type from "leaflet";

type MapProps = {
  className?: string;
  center?: Geo.Position;
  zoom?: number;
  mounted?: (ref: Type.Map) => void;
};
export function Map({ className, center, zoom = 50, mounted }: MapProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[center?.lat || 0, center?.lon || 0]}
        zoom={lerp(0, 18, zoom / 100)}
        className="h-full w-full rounded-3xl overflow-hidden"
        whenCreated={mounted}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* <Marker position={[51.505, -0.09]} /> */}
      </MapContainer>
    </div>
  );
}
