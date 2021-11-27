import { ReactComponent as Search } from "@/assets/svgs/search-icon.svg";
import { ReactComponent as Clock } from "@/assets/svgs/clock-icon.svg";
import { ReactComponent as Back } from "@/assets/svgs/back-icon.svg";
import { ReactComponent as Close } from "@/assets/svgs/close-icon.svg";
import { ReactComponent as Route } from "@/assets/svgs/route-icon.svg";
import { ReactComponent as Map } from "@/assets/svgs/map-icon.svg";
import { ReactComponent as Info } from "@/assets/svgs/info-icon.svg";
import { ReactComponent as LastTime } from "@/assets/svgs/lasttime-icon.svg";
import { ReactComponent as ArriveTime } from "@/assets/svgs/arrivetime-icon.svg";
import { ReactComponent as ClickToTop } from "@/assets/svgs/click-to-top-icon.svg";
import { ReactComponent as Success } from "@/assets/svgs/success-icon.svg";
import { ReactComponent as Bus } from "@/assets/svgs/bus.svg";
import { ReactComponent as Air } from "@/assets/svgs/air.svg";
import { ReactComponent as Alert } from "@/assets/svgs/alert.svg";

import LocationURL, {
  ReactComponent as Location,
} from "@/assets/svgs/location.svg";

import LocationActiveURL, {
  ReactComponent as LocationActive,
} from "@/assets/svgs/location-active.svg";

import { Icon as LeafletIcon } from "leaflet";

export const Icon = {
  Search,
  Clock,
  Back,
  Close,
  Route,
  Map,
  Info,
  LastTime,
  ArriveTime,
  ClickToTop,
  Location,
  LocationActive,
  Success,
  Bus,
  Air,
  Alert,
  Leaflet: {
    Location: new LeafletIcon({
      iconUrl: LocationURL,
      iconSize: [40, 40],
      iconAnchor: [20, 35],
    }),
    LocationActive: new LeafletIcon({
      iconUrl: LocationActiveURL,
      iconSize: [60, 60],
      iconAnchor: [31, 55],
    }),
  },
};
