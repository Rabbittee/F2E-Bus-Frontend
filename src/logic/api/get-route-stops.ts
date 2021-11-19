import { Stop } from "@/models";
import { API } from "./api";
import { Res, Req } from "./types";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRouteStops: build.query<Stop[], Req.GetRouteStops>({
      query: ({ id, direction }) => ({
        url: `/routes/${id}/stops`,
        params: { direction },
      }),

      transformResponse: (res: Res.GetRouteStops) =>
        res.stops.map(({ id, name, position }) => ({ id, name, position })),
    }),
  }),
});
