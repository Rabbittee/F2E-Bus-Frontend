import clsx from "clsx";
import { Link, To } from "react-router-dom";

import { Tabs, Badge } from "@/components";
import { HasID, HasName } from "@/models";

type Item = HasID &
  HasName & {
    active?: boolean;
    to: To;
  };
type SubRoutesProps = {
  className?: string;
  items: Item[];
};
export function SubRoutes({ className, items }: SubRoutesProps) {
  return (
    <Tabs
      classes={{
        wrapper: clsx(className, "text-lg text-white"),
        list: "flex whitespace-nowrap overflow-scroll gap-4",
      }}
      items={items}
    >
      {({ to, name, active }) =>
        typeof to !== "string" && to.hash ? (
          <a href={`#${to.hash}`}>
            <Badge active={active}>{name}</Badge>
          </a>
        ) : (
          <Link to={to}>
            <Badge active={active}>{name}</Badge>
          </Link>
        )
      }
    </Tabs>
  );
}
