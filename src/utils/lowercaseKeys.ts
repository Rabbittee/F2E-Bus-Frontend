import { isObject } from ".";
import { isArray } from "./is";

function mapping<I extends {}, R extends {}>(obj: I): R {
  const result: [string, any][] = [];

  for (const [key, value] of Object.entries(obj)) {
    result.push([key.toLowerCase(), lowercaseKeys(value)]);
  }

  return Object.fromEntries(result) as R;
}

export function lowercaseKeys(data: any): any {
  if (isArray(data)) return data.map(lowercaseKeys);

  if (isObject(data)) return mapping(data);

  return data;
}
