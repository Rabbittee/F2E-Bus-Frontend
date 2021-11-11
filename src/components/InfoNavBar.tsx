import { Icon } from "@/components";

import clsx from "clsx";

export function InfoNavBar() {
  return (
    <nav className="w-full relative">
      <ul className="flex justify-between">
        <li
          className={clsx(
            "  flex-1 text-center ",
            location.pathname === "/route/arive"
              ? "text-orange border-t rounded-t-xl"
              : " text-cyan-dark border-b",
            location.pathname === "/route/map" && "rounded-br-xl"
          )}
        >
          <a href="/route/arive">
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Route className="w-10" />
              <p className="text-base">公車路線</p>
            </span>
          </a>
        </li>
        <li
          className={clsx(
            "flex-1 text-center ",
            location.pathname === "/route/map"
              ? "text-orange border-t rounded-xl"
              : "text-cyan-dark border-b",
            location.pathname === "/route/arive" && "rounded-bl-xl",
            location.pathname === "/route/info" && " rounded-br-xl"
          )}
        >
          <a href="/route/map">
            <span className="flex flex-col justify-center items-center py-3">
              <Icon.Map className="w-10" />
              <p className="text-base">公車地圖</p>
            </span>
          </a>
        </li>
        <li
          className={clsx(
            " flex-1 text-center ",
            location.pathname === "/route/info"
              ? "border-t rounded-t-xl text-orange"
              : "text-cyan-dark border-b",
            location.pathname === "/route/map" && "rounded-bl-xl"
          )}
        >
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
