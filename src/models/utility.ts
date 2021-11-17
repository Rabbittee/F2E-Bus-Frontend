import { Primitive } from "utility-types";

export type Has<K extends string, T> = {
  [key in K]: T;
};

export type HasID = Has<"id", Primitive>;
export type HasName = Has<"name", string>;
export type HasURL = Has<"url", string>;
export type HasValue = Has<"value", Primitive>;
export type HasChecked = Has<"checked", boolean>;
