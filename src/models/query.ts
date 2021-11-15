import { Geo } from "./geo";

export interface Query {
  id: string;
  name: string;
  url: string;
}

export interface Station extends Query {
  position: Geo.Position;
}
