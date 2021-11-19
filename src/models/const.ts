export enum Direction {
  Departure = 0,
  Destination = 1,
  Loop = 2,
  Unknown = 255,
}

export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
