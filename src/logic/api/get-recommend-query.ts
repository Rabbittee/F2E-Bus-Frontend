import { Geo } from "@/models";
import { lowercaseKeys } from "@/utils";
import { API } from "./api";
import { Res, Req } from "./types";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getRecommendQuery: build.query<
      Res.GetRecommendQuery,
      Req.GetRecommendQuery
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
  }),
});
