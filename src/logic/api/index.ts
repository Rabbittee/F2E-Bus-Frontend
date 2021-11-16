import { Query, Geo, Station, Route, SubRoute, Direction } from "@/models";
import { lowercaseKeys } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/config";
import { head } from "ramda";

type GetRecommendQueryProps = {
  query?: string;
  location?: Geo.Position;
  radius?: number;
  use_geocode_api?: boolean;
  with_bounding_center?: boolean;
};

export namespace Res {
  export interface GetRecommendQuery {
    routes: Query[];
    stations: Station[];
    bbox?: Geo.BoundingBox;
    center?: Geo.Position;
  }

  export interface GetGeocodeByQuery {
    location: Geo.Position;
    address: string;
  }
}

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

export const API = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Query"],
  endpoints: (build) => ({
    getRecommendQuery: build.query<
      Res.GetRecommendQuery,
      GetRecommendQueryProps
    >({
      query: ({ query, location, ...props }) => ({
        url: `/queries/recommend`,
        params: {
          q: query,
          location: location && Geo.toString(location),
          ...props,
        },
      }),

      providesTags: ["Query"],

      transformResponse: lowercaseKeys,
    }),

    getGeocodeByQuery: build.query<Res.GetGeocodeByQuery, string>({
      query: (query) => ({
        url: `/queries/geocoding`,
        params: { keyword: query },
      }),

      transformResponse: head,
    }),

    getStationInformation: build.query<Station, string>({
      query: (id) => `/stations/${id}/informations`,

      transformResponse: (res: any) => ({
        id: res["id"],
        name: res["name"],
        url: res["url"],
        position: res["position"],
        address: res["address"],
        routes: res["routes"],
      }),
    }),

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

export default API;
