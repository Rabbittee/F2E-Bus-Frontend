import clsx from "clsx";
import { useState } from "react";

const anchors = [
  {
    key: "routeName",
    name: "台北市公車 262",
  },
  {
    key: "payment",
    name: "收費方式",
  },
  {
    key: "worktimelist",
    name: "平日發車資訊",
  },
  {
    key: "holidaytimelist",
    name: "假日發車資訊",
  },
];

export function InfoTab() {
  const [active, setActive] = useState<string | undefined>("routeName");
  function ClickTab(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.stopPropagation();
    setActive(id);
  }
  return (
    <nav className="pl-4 relative">
      <ul className="flex overflow-x-scroll gap-2 whitespace-nowrap pr-2">
        {anchors.map((anchor: any) => {
          return (
            <li
              key={anchor.key}
              className={clsx(
                "rounded-full text-lg font-bold px-2 py-1",
                "text-white",
                anchor.key === active ? "bg-cyan" : "bg-gray-400"
              )}
            >
              <a
                key={anchor.key}
                href={"#" + anchor.key}
                onClick={(e) => ClickTab(e, anchor.key)}
              >
                {anchor.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
