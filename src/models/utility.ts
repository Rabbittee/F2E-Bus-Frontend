export type Has<K extends string, T> = {
  [key in K]: T;
};

export type HasID = Has<"id", string>;
export type HasValue = Has<"value", string>;
export type HasChecked = Has<"checked", boolean>;
