import { Geo } from "./geo";

export interface Query {
  id: string;
  name: string;
  url: string;
}

export enum Direction {
  Departure = 0,
  Destination = 1,
  Loop = 2,
  Unknown = 255,
}

export interface SubRoute {
  id: string;
  name: string;
  direction: Direction;

  busTime: {
    first: string;
    last: string;
    holidayFirst: string;
    holidayLast: string;
  };
}

export interface Route extends Query {
  city: string;

  subRoutes: SubRoute[];

  departure: string;
  destination: string;

  price: {
    description: string;
    buffer: string;
  };
}

export interface Station extends Query {
  position: Geo.Position;
}
