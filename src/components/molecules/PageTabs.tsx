import clsx from "clsx";
import { Link, To } from "react-router-dom";
import { ReactNode } from "react";

import { Tabs } from "@/components";
import { HasID, HasName } from "@/models";

interface Tab extends HasID, HasName {
  icon: ReactNode;
  active?: boolean;
  to: To;
}
type Props = {
  items: Tab[];
};
export function PageTabs({ items }: Props) {
  return (
    <div className="flex relative overflow-hidden pt-2">
      <Tabs
        classes={{
          wrapper: "w-full md:flex md:justify-start",
          list: "flex",
          item: "flex-1",
        }}
        items={items}
      >
        {({ name, icon, active, to }) => (
          <Link to={to} replace>
            <div
              className={clsx(
                "h-full py-3 rounded-2xl",
                "flex flex-col justify-end items-center gap-1 md:px-8",
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
