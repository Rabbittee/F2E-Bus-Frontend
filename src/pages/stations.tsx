import { Link } from "react-router-dom";

import { List, Item } from "@/components";
import { API, Params } from "@/logic";
import { URLSearchParams } from "@/utils";
import clsx from "clsx";

export function Stations() {
  const id = Params.useID();
  const { data } = API.useGetStationInformationQuery(id!, { skip: !id });

  return (
    <List
      classes={{
        wrapper: clsx(
          "px-8 py-2 text-lg text-white space-y-4 overflow-auto h-full",
          "md:p-0"
        ),
        list: "pb-8",
      }}
      title={<strong className="text-2xl text-orange">{data?.name}</strong>}
      items={data?.routes}
    >
      {({ id, name, departure, destination }) => (
        <Link
          to={{
            pathname: `/routes/${String(id)}`,
            search: URLSearchParams({ query: name }),
          }}
        >
          <Item.WithTitle
            title={
              <div className="flex justify-between">
                <strong className="text-xl">{name}</strong>

                <small>7分鐘</small>
              </div>
            }
          >
            <strong className="text-orange">
              {departure} — {destination}
            </strong>
          </Item.WithTitle>
        </Link>
      )}
    </List>
  );
}
