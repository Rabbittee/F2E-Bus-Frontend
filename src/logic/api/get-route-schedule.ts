import { API } from "./api";
import { Schedule } from "@/models";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRouteSchedule: build.query<Schedule, string>({
      query: (id) => `/routes/${id}/schedule`,
    }),
  }),
});
