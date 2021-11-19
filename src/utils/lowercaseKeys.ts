import { map, is, cond, T, identity } from "ramda";

function mapping<I extends {}, R extends {}>(obj: I): R {
  const result: [string, any][] = [];

  for (const [key, value] of Object.entries(obj)) {
    result.push([key.toLowerCase(), lowercaseKeys(value)]);
  }

  return Object.fromEntries(result) as R;
}

export function lowercaseKeys<R extends {}>(data: any): R {
  return cond([
    [is(Array), map(lowercaseKeys)],
    [is(Object), mapping],
    [T, identity],
  ])(data);
}
