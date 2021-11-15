import type { Primitive } from "utility-types";

const _URLSearchParams = globalThis.URLSearchParams;

export function URLSearchParams(params: Record<string, Primitive>) {
  const instance = new _URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    instance.append(key, String(value));
  }

  return instance.toString();
}
