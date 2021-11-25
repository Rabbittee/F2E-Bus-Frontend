export function isObject(data: unknown): data is object {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}

export function isArray(data: unknown): data is any[] {
  return Array.isArray(data);
}
