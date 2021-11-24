import { Station } from "@/models";
import { API } from "./api";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getStationInformation: build.query<Station, string>({
      query: (id) => `/stations/${id}/informations`,

      transformResponse: ({ position, tdx_id, ...props }: any) => ({
        ...props,
        tdxID: tdx_id,
        position: { lat: position.lat, lng: position.lon },
      }),
    }),
  }),
});
