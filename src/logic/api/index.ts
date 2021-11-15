import { Query, Geo } from "@/models";
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
    stations: Query[];
    bbox?: Geo.BoundingBox;
    center?: Geo.Position;
  }

  export interface GetGeocodeByQuery {
    location: Geo.Position;
    address: string;
  }
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
  }),
});

export default API;
