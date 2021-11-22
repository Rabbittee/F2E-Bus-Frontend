import { Outlet, useLocation, matchPath } from "react-router-dom";

import { PageTabs, Icon } from "@/components";
import Map from "./Map";
import clsx from "clsx";

export function Route() {
  const location = useLocation();

  const match = (pattern: string) =>
    Boolean(matchPath(`routes/:id/${pattern}`, location.pathname));

  return (
    <div
      className={clsx(
        "flex flex-col flex-1 text-dark-green",
        "md:flex-row md:max-h-[86vh]"
      )}
    >
      <div className={clsx("flex flex-col w-full", match("map") || "md:w-2/3")}>
        <PageTabs
          items={[
            {
              id: "1",
              name: "公車路線",
              icon: <Icon.Route className="w-9" />,
              to: { pathname: "" },
              active: match("/"),
            },
            {
              id: "2",
              name: "公車地圖",
              icon: <Icon.Map className="w-10" />,
              to: { pathname: "map" },
              active: match("map"),
            },
            {
              id: "3",
              name: "公車資訊",
              icon: <Icon.Info className="w-8" />,
              to: { pathname: "info" },
              active: match("info"),
            },
          ]}
        />

        <Map
          className={clsx(
            match("map") || "hidden",
            "h-[32vh] md:block md:h-[76vh]"
          )}
        />
      </div>

      <div
        className={clsx(
          "pt-4 pb-8 flex flex-col gap-2 md:w-1/3",
          match("map") && "md:hidden"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
