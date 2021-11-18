import clsx from "clsx";
import { useLocation, Link, To } from "react-router-dom";
import { cond, equals, T } from "ramda";
import { ReactNode } from "react";

import { Icon, Tabs } from "@/components";
import { HasID, HasName } from "@/models";
import Arrival from "./Arrival";

interface Tab extends HasID, HasName {
  icon: ReactNode;
  active?: boolean;
  to: To;
}
type PageTabsProps = {
  items: Tab[];
};
function PageTabs({ items }: PageTabsProps) {
  return (
    <div className="flex flex-col relative overflow-hidden pt-2">
      <Tabs classes={{ list: "flex", item: "flex-1" }} items={items}>
        {({ name, icon, active, to }) => (
          <Link to={to}>
            <div
              className={clsx(
                "h-full py-3 rounded-2xl",
                "flex flex-col justify-end items-center gap-1",
                active
                  ? "shadow bg-white text-orange relative z-10"
                  : "text-gray-400"
              )}
            >
              {icon}

              <strong>{name}</strong>

              {active && (
                <div className="bg-white h-3 w-full absolute bottom-0" />
              )}
            </div>
          </Link>
        )}
      </Tabs>

      <div className="bg-white shadow h-2 w-full absolute bottom-0" />
    </div>
  );
}

export function Routes() {
  const location = useLocation();

  return (
    <div className="flex flex-col flex-1">
      <PageTabs
        items={[
          {
            id: "1",
            name: "公車路線",
            icon: <Icon.Route className="w-9" />,
            to: { ...location, hash: undefined },
            active: !location.hash,
          },
          {
            id: "2",
            name: "公車地圖",
            icon: <Icon.Map className="w-10" />,
            to: { ...location, hash: "#map" },
            active: location.hash === "#map",
          },
          {
            id: "3",
            name: "公車資訊",
            icon: <Icon.Info className="w-8" />,
            to: { ...location, hash: "#info" },
            active: location.hash === "#info",
          },
        ]}
      />

      <div className="flex-1">
        {cond<string, ReactNode>([
          [equals("#map"), () => <></>],
          [equals("#info"), () => <></>],
          [T, () => <Arrival />],
        ])(location.hash)}
      </div>
    </div>
  );
}
