import { Query, Geo } from "@/models";
import { lowercaseKeys, isObject } from "@/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { concat, map, pipe, reduce, tap, values } from "ramda";
import { BASE_URL } from "@/config";

type GetRecommendQueryProps = {
  query: string;
  location?: Geo.Position;
};

namespace Res {
  export interface Query {
    URL: string;
    id: string;
    name: string;
  }

  export interface GetRecommendQuery {
    routes: Query[];
    stations: Query[];
  }
}

const log = <T>(tag: string) => tap<T>((msg) => console.log(tag, msg));

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
          q: query || undefined,
          location: location && Geo.toString(location),
        },
      }),

      providesTags: ["Query"],

      transformResponse: pipe<
        Res.GetRecommendQuery,
        Res.Query[][],
        Res.Query[],
        Query[],
        Query[]
      >(
        values,
        reduce<Res.Query[], Res.Query[]>(concat, []),
        map<Res.Query, Query>(lowercaseKeys),
        log("API.GetRecommendQuery: ")
      ),
    }),
  }),
});

export default API;
