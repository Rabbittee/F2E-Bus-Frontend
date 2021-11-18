import { Geo } from "./geo";
import { Direction } from "./const";
import { HasID, HasName, HasURL } from ".";

export type Query = HasID & HasName & HasURL;

export interface SubRoute extends HasID, HasName {
  direction: Direction;

  busTime: {
    first: string;
    last: string;
    holidayFirst: string;
    holidayLast: string;
  };
}

export interface Route extends HasID, HasName {
  city: string;

  subRoutes: SubRoute[];

  departure: string;
  destination: string;

  price: {
    description: string;
    buffer: string;
  };
}

export interface Estimate {
  remain: number;
  arrival: number;
}

export interface Stop extends HasID, HasName {
  position: Geo.Position;
}

export interface Station extends Stop {
  address: string;
  routes: Route[];
}
