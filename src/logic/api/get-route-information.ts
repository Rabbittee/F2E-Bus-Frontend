import { Route, SubRoute, Direction } from "@/models";
import { API } from "./api";

function toSubroute(item: any): SubRoute {
  return {
    id: item?.["id"] || "",
    name: item?.["name"] || "",
    direction: item?.["direction"] || Direction.Unknown,
    busTime: {
      first: item?.["first_bus_time"] || "",
      last: item?.["last_bus_time"] || "",
      holidayFirst: item?.["holiday_first_bus_time"] || "",
      holidayLast: item?.["holiday_last_bus_time"] || "",
    },
  };
}

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRouteInformation: build.query<Route, string>({
      query: (id) => `/routes/${id}/information`,

      transformResponse: (res: any) => ({
        id: res["id"],
        name: res["name"],
        city: res["city"],
        url: res["url"],
        subRoutes: res["sub_routes"].map(toSubroute),
        departure: res["departure"],
        destination: res["destination"],
        price: {
          description: res["price_description"],
          buffer: res["fare_buffer_zone_description"],
        },
      }),
    }),
  }),
});
