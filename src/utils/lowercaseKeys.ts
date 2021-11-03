import { map, is, cond, T, identity } from "ramda";

const mapping = cond([
  [is(Array), map(lowercaseKeys)],
  [is(Object), lowercaseKeys],
  [T, identity],
]);

export function lowercaseKeys<I extends {}, R extends {}>(obj: I): R {
  const result: [string, any][] = [];

  for (const [key, value] of Object.entries(obj)) {
    result.push([key.toLowerCase(), mapping(value)]);
  }

  return Object.fromEntries(result) as R;
}
