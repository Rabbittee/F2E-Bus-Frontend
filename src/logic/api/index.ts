import { Query, Geo } from "@/models";
import { lowercaseKeys } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "@/config";

type GetRecommendQueryProps = {
  query: string;
  location?: Geo.Position;
};

namespace Res {
  export interface GetRecommendQuery {
    routes: Query[];
    stations: Query[];
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
      query: ({ query, location }) => ({
        url: `/queries/recommend`,
        params: {
          q: query || undefined,
          location: location && Geo.toString(location),
        },
      }),

      providesTags: ["Query"],

      transformResponse: lowercaseKeys,
    }),
  }),
});

export default API;
