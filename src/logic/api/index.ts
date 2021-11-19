import GetRecommendQuery from "./get-recommend-query";
import GetGeocodeByQuery from "./get-geocode-by-query";
import GetRouteInformation from "./get-route-information";
import GetRouteStopEstimate from "./get-route-stop-estimate";
import GetRouteStops from "./get-route-stops";
import GetStationInformation from "./get-station-information";

export const API = {
  ...GetRecommendQuery,
  ...GetGeocodeByQuery,
  ...GetRouteInformation,
  ...GetRouteStopEstimate,
  ...GetRouteStops,
  ...GetStationInformation,
};
