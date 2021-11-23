import { Station } from "@/models";
import { API } from "./api";

export default API.injectEndpoints({
  endpoints: (build) => ({
    getStationInformation: build.query<Station, string>({
      query: (id) => `/stations/${id}/informations`,

      transformResponse: ({ position, ...props }: any) => ({
        ...props,
        position: { lat: position.lat, lng: position.lon },
      }),
    }),
  }),
});
