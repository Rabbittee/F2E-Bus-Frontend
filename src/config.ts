const { VITE_MOCK_API_URL, VITE_API_URL, DEV, VITE_MOCK, VITE_MAP_TOKEN } =
  import.meta.env;

export const MODE_DEV_MOCK = Boolean(DEV && VITE_MOCK);

export const BASE_URL = String(
  MODE_DEV_MOCK ? VITE_MOCK_API_URL : VITE_API_URL || "/api"
);

export const MAP_TOKEN = VITE_MAP_TOKEN ? String(VITE_MAP_TOKEN) : undefined;
