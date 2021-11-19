import { Station } from "@/models";
import { API } from "./api";

export default API.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});
