import { Trip } from "@/models";
import { API } from "./api";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getStationEstimate: build.query<Trip[], string>({
      query: (id) => `/stations/${id}/estimatetime`,

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
