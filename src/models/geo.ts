export namespace Geo {
  export interface Position {
    lon: number;
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
    return `${position.lat},${position.lon}`;
  }
}
