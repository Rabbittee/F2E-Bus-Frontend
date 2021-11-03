export namespace Geo {
  export interface Position {
    lon: number;
    lat: number;
  }

  export function toString(position: Position) {
    return `${position.lat},${position.lon}`;
  }
}
