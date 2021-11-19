import GetRecommendQuery from "./get-recommend-query";
import GetGeocodeByQuery from "./get-geocode-by-query";
import GetRouteInformation from "./get-route-information";
import GetRouteStopEstimate from "./get-route-stop-estimate";
import GetRouteSchedule from "./get-route-schedule";
import GetRouteStops from "./get-route-stops";
import GetStationInformation from "./get-station-information";

export const API = {
  ...GetRecommendQuery,
  ...GetGeocodeByQuery,
  ...GetRouteInformation,
  ...GetRouteStopEstimate,
  ...GetRouteStops,
  ...GetStationInformation,
  ...GetRouteSchedule,
  endpoints: {
    ...GetRecommendQuery.endpoints,
    ...GetGeocodeByQuery.endpoints,
    ...GetRouteInformation.endpoints,
    ...GetRouteStopEstimate.endpoints,
    ...GetRouteStops.endpoints,
    ...GetStationInformation.endpoints,
    ...GetRouteSchedule.endpoints,
  },
};
