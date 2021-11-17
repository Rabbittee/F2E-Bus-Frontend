import clsx from "clsx";

import { Icon, Tabs } from "@/components";
import Arrival from "./Arrival";

function PageTabs() {
  return (
    <div className="flex flex-col relative overflow-hidden pt-2">
      <Tabs
        classes={{ list: "flex", item: "flex-1" }}
        items={[
          {
            id: "1",
            name: "公車路線",
            icon: <Icon.Route className="w-9" />,
            active: true,
          },
          { id: "2", name: "公車地圖", icon: <Icon.Map className="w-10" /> },
          { id: "3", name: "公車資訊", icon: <Icon.Info className="w-8" /> },
        ]}
      >
        {({ name, icon, active }) => (
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
        )}
      </Tabs>

      <div className="bg-white shadow h-2 w-full absolute bottom-0" />
    </div>
  );
}

export function Routes() {
  return (
    <div className="flex flex-col flex-1">
      <PageTabs />

      <div className="flex-1">
        <Arrival />
      </div>
    </div>
  );
}
