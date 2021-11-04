export interface Query {
  id: string;
  name: string;
  url: string;
}

export interface Route extends Query {}

export interface Station extends Query {}
