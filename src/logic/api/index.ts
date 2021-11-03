import { Query } from "@/models";
import { lowercaseKeys, isObject } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { concat } from "ramda";
import { BASE_URL } from "@/config";

const API = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Query"],
  endpoints: (build) => ({
    getRecommendQuery: build.query<Query[], void>({
      query: () => ({ url: `/queries/recommend` }),

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
