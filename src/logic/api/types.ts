import { Route, Geo, Station, Direction } from "@/models";

export namespace Req {
  export interface GetRecommendQuery {
    query?: string;
    location?: Geo.Position;
    radius?: number;
    use_geocode_api?: boolean;
    with_bounding_center?: boolean;
  }

  export interface GetRouteStops {
    id: string;
    direction: Direction;
  }
}

export namespace Res {
  export interface GetRecommendQuery {
    routes: Route[];
    stations: Station[];
    bbox?: Geo.BoundingBox;
    center?: Geo.Position;
  }

  export interface GetRouteStops {
    stops: {
      id: string;
      name: string;
      position: Geo.Position;
      estimate_time?: number;
    }[];
  }
}
