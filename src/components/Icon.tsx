import { ReactComponent as Search } from "@/assets/svgs/search-icon.svg";
import { ReactComponent as Clock } from "@/assets/svgs/clock-icon.svg";
import { ReactComponent as Back } from "@/assets/svgs/back-icon.svg";
import { ReactComponent as Close } from "@/assets/svgs/close-icon.svg";
import { ReactComponent as Route } from "@/assets/svgs/route-icon.svg";
import { ReactComponent as Map } from "@/assets/svgs/map-icon.svg";
import { ReactComponent as Info } from "@/assets/svgs/info-icon.svg";
import { ReactComponent as LastTime } from "@/assets/svgs/lasttime-icon.svg";

import _Location from "@/assets/svgs/location.svg";
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
  Leaflet: {
    Location: new LeafletIcon({ iconUrl: _Location, iconSize: [38, 95] }),
  },
};
