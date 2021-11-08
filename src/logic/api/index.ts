import { Query, Geo } from "@/models";
import { lowercaseKeys, isObject } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { concat } from "ramda";
import { BASE_URL } from "@/config";

type GetRecommendQueryProps = {
  query: string;
  location?: Geo.Position;
};

export const API = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Query"],
  endpoints: (build) => ({
    getRecommendQuery: build.query<Query[], GetRecommendQueryProps>({
      query: ({ query, location }) => ({
        url: `/queries/recommend`,
        params: {
          q: query ? query : undefined,
          location: location && Geo.toString(location),
        },
      }),

      providesTags: ["Query"],

      transformResponse: (response) => {
        if (isObject(response)) {
          return Object.values<Query[]>(lowercaseKeys(response)).reduce(concat);
        }

        throw new Error("Invalid response");
      },
    }),
  }),
});

export default API;
