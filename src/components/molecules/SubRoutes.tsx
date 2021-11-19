import clsx from "clsx";
import { Link } from "react-router-dom";

import { Tabs, Badge } from "@/components";
import { Has, HasID, HasName } from "@/models";
import { URLSearchParams } from "@/utils";

type Item = HasID & HasName & Has<"active", boolean>;
type SubRoutesProps = {
  className?: string;
  items: Item[];
  query: string;
};
export function SubRoutes({ className, items, query }: SubRoutesProps) {
  return (
    <Tabs
      classes={{
        wrapper: clsx(className, "text-lg text-white"),
        list: "flex whitespace-nowrap overflow-scroll gap-4",
      }}
      items={items}
    >
      {({ id, name, active }) => (
        <Link to={{ search: URLSearchParams({ direction: id, query }) }}>
          <Badge active={active}>{name}</Badge>
        </Link>
      )}
    </Tabs>
  );
}
