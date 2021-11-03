export const MODE_DEV_MOCK = Boolean(
  import.meta.env.DEV && import.meta.env.VITE_MOCK
);

export const BASE_URL = String(import.meta.env.VITE_API_URL || "/api");
