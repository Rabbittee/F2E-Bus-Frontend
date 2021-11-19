import { Trip } from "@/models";
import { Req } from "./types";
import { API } from "./api";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRouteStopEstimate: build.query<Trip[], Req.GetRouteStops>({
      query: ({ id, direction }) => ({
        url: `/routes/${id}/stops/estimatetime`,
        params: { direction },
      }),

      transformResponse: (res: any[]) =>
        res.map((item) => ({
          routeID: item["route_id"],
          stationID: item["station_id"],
          timeOffset: item["time_offset"],
          status: item["status"],
        })),
    }),
  }),
});
