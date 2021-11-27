import { API } from "./api";
import { Req } from "./types";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRouteLineString: build.query<any, Req.GetRouteStops>({
      query: ({ id, direction }) => ({
        url: `/routes/${id}/line_string`,
        params: { direction },
      }),
    }),
  }),
});
