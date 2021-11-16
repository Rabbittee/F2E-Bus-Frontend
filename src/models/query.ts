import { Geo } from "./geo";
import { Direction } from "./const";

export interface Query {
  id: string;
  name: string;
  url: string;
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
  address: string;
}
