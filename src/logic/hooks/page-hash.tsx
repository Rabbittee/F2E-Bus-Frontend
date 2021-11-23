import { useLocation } from "react-router-dom";

export function useHash() {
  return useLocation()["hash"].replace("#", "");
}
