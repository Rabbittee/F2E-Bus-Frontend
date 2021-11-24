import { Link } from "react-router-dom";
import clsx from "clsx";

import { List, Item } from "@/components";
import { API, Params, Estimate } from "@/logic";
import { URLSearchParams } from "@/utils";
import { TripStatus } from "@/models";

export function Stations() {
  const id = Params.useID();
  const { data: information } = API.useGetStationInformationQuery(id!, {
    skip: !id,
  });
  const { data: estimate } = API.useGetStationEstimateQuery(id!, {
    skip: !id,
    pollingInterval: 5 * 1000,
  });

  const getRemainByID = Estimate.remain(estimate);
  const getStatusByID = Estimate.status(estimate);

  return (
    <List
      classes={{
        wrapper: clsx(
          "px-8 py-2 text-lg text-white space-y-4 overflow-auto h-full",
          "md:p-0"
        ),
        list: "pb-8",
      }}
      title={
        <strong className="text-2xl text-orange">{information?.name}</strong>
      }
      items={information?.routes}
    >
      {({ id, name, departure, destination }) => (
        <Link
          to={{
            pathname: `/routes/${String(id)}`,
            search: URLSearchParams({ query: name }),
          }}
        >
          <Item.WithTitle
            classes={{
              wrapper: clsx(
                getStatusByID(String(id)) === TripStatus.Default || "opacity-50"
              ),
              title: clsx(
                getStatusByID(String(id)) === TripStatus.Default
                  ? "bg-orange"
                  : "bg-gray-500"
              ),
              content: clsx(
                getStatusByID(String(id)) === TripStatus.Default
                  ? "text-orange"
                  : "text-gray-500"
              ),
            }}
            title={
              <div className="flex justify-between">
                <strong className="text-xl">{name}</strong>

                <small>{getRemainByID(String(id))}</small>
              </div>
            }
          >
            <strong>
              {departure} — {destination}
            </strong>
          </Item.WithTitle>
        </Link>
      )}
    </List>
  );
}
