import { useMemo } from "react";
import { useSearchParams as _useSearchParams } from "react-router-dom";

import { Query, useSelector } from "@/logic";
import { Geo } from "@/models";

export namespace SearchParams {
  function useSearchParams() {
    const [params] = _useSearchParams({
      query: useSelector(Query.selectQuery),
    });

    return Object.fromEntries(params.entries());
  }

  export function useQuery() {
    return useSearchParams()["query"];
  }

  export function useGeo() {
    const params = useSearchParams();

    return useMemo<Geo.Position>(
      () => ({
        lat: Number(params["lat"] || 0),
        lon: Number(params["lon"] || 0),
      }),
      [params]
    );
  }
}
