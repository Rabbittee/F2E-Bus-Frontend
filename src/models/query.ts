import { Geo } from "./geo";
import { Direction, Day, City } from "./const";
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
  city: City;

  subRoutes: SubRoute[];

  departure: string;
  destination: string;

  price: {
    description: string;
    buffer: string;
  };
}

export const enum TripStatus {
  Default = 0,
  NotDepart = 1,
  Skipped = 2,
  Terminate = 3,
  Unscheduled = 4,
}

export interface Trip {
  routeID: Route["id"];
  stationID: Station["id"];
  timeOffset: number;
  status: TripStatus;
}

export interface Estimate {
  remain: number;
  arrival: number;
}

export interface Stop extends HasID, HasName {
  position: Geo.Position;
}

export interface Station extends Stop {
  tdxID: string;
  address: string;
  routes: Route[];
}

namespace TimeTable {
  export interface Regular {
    type: "regular";
    day: Day;
    arrival_time: string;
  }

  export interface Flexible {
    type: "flexible";
    day: Day;
    max_headway: number;
    min_headway: number;
    start_time: string;
    end_time: string;
  }
}

export type Schedule = {
  [key in Day]?: TimeTable.Regular[] | TimeTable.Flexible[];
};
