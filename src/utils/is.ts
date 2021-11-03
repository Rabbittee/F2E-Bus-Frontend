export function isObject(data: unknown): data is object {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
