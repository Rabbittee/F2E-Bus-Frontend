import { Geo } from "@/models";
import { lowercaseKeys } from "@/utils";
import { pipe } from "ramda";
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

      transformResponse: pipe(
        lowercaseKeys,
        ({ bbox, center, stations, ...props }: any) => ({
          ...props,
          bbox: bbox && [
            [bbox.top, bbox.left],
            [bbox.bottom, bbox.right],
          ],
          center: center && { lat: center.lat, lng: center.lon },
          stations: stations.map(({ tdx_id, ...props }: any) => ({
            ...props,
            tdxID: tdx_id,
          })),
        })
      ),
    }),
  }),
});
