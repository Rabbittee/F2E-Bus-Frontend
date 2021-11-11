import { Icon } from "@/components";
import { useLocation } from "react-router";

export function InfoNavBar() {
  const location = useLocation();
  return (
    <nav className="w-full relative">
      <ul className="flex justify-between">
        <li className="border-b border-gray-200 flex-1 text-center text-cyan-dark">
          <a href="/route/arive">
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Route className="w-10" />
              <p className="text-base">公車路線</p>
            </span>
          </a>
        </li>
        <li className="border-b rounded-r-xl flex-1 text-center text-cyan-dark">
          <a href="/route/map">
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Map className="w-10" />
              <p className="text-base">公車地圖</p>
            </span>
          </a>
        </li>
        <li className="border-t rounded-tl-xl flex-1 text-center text-orange">
          <a href="/route/info">
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Info className="w-10" />
              <p className="text-base">公車資訊</p>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
