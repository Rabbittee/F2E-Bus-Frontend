export type Has<K extends string, T> = {
  [key in K]: T;
};

export type HasID = Has<"id", string>;
