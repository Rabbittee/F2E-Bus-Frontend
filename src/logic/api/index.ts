import GetRecommendQuery from "./get-recommend-query";
import GetRouteInformation from "./get-route-information";
import GetRouteStopEstimate from "./get-route-stop-estimate";
import GetRouteSchedule from "./get-route-schedule";
import GetRouteStops from "./get-route-stops";
import GetRouteLineString from "./get-route-line-string";
import GetStationInformation from "./get-station-information";
import GetStationEstimate from "./get-station-estimate";

export const API = {
  ...GetRecommendQuery,
  ...GetRouteInformation,
  ...GetRouteStopEstimate,
  ...GetRouteStops,
  ...GetRouteSchedule,
  ...GetRouteLineString,
  ...GetStationInformation,
  ...GetStationEstimate,
  endpoints: {
    ...GetRecommendQuery.endpoints,
    ...GetRouteInformation.endpoints,
    ...GetRouteStopEstimate.endpoints,
    ...GetRouteStops.endpoints,
    ...GetStationInformation.endpoints,
    ...GetRouteSchedule.endpoints,
    ...GetStationEstimate.endpoints,
    ...GetRouteLineString.endpoints,
  },
};
