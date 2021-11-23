import type { LatLngBoundsLiteral } from "leaflet";
export namespace Geo {
  export interface Position {
    lng: number;
    lat: number;
  }

  export enum Status {
    NOT_SUPPORTED = -1,
    PERMISSION_DENIED = 1,
    POSITION_UNAVAILABLE = 2,
    TIMEOUT = 3,
    UNKNOWN_ERROR = 999,
  }

  export function toString(position: Position) {
    return `${position.lat.toPrecision(7)},${position.lng.toPrecision(7)}`;
  }

  export type BoundingBox = LatLngBoundsLiteral;
}
