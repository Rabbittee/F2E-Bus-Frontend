import { cond, pipe } from "ramda";
import { ReactNode, useState } from "react";
import { addSeconds, formatDistanceToNowStrict, format } from "date-fns";
import zhTW from "date-fns/locale/zh-TW";
import { Link, useLocation } from "react-router-dom";

import { Title, List, Item } from "@/components";
import { Direction, Trip, TripStatus, Estimate, Stop } from "@/models";
import { API } from "@/logic";
import clsx from "clsx";

type Props = {
  id?: string;
  stops?: Stop[];
  direction: Direction;
  className?: string;
};
export function ListOfStops({ id, stops, direction, className }: Props) {
  const pathname = useLocation()["pathname"].replace("/map", "");

  const { data: trips } = API.useGetRouteStopEstimateQuery(
    { id: id!, direction },
    {
      skip: !id,
      pollingInterval: 5 * 1000,
    }
  );

  const data = stops?.map((stop) => ({
    ...stop,
    trip: trips?.find(({ stationID }) => stationID === stop.id),
  }));

  const [display, setEstimateDisplay] = useState<keyof Estimate>("remain");

  const Case = {
    ["Unscheduled"]: (trip: Trip) => trip.status === TripStatus.Unscheduled,

    ["Skipped"]: (trip: Trip) => trip.status === TripStatus.Skipped,

    ["Terminate"]: (trip: Trip) => trip.status === TripStatus.Terminate,

    ["Not Depart"]: (trip: Trip) => trip.status === TripStatus.NotDepart,

    ["Arrive"]: (trip: Trip) =>
      trip.status === TripStatus.Default && trip.timeOffset <= 30,

    ["Coming"]: (trip: Trip) =>
      trip.status === TripStatus.Default && trip.timeOffset <= 60,

    ["En Route"]: (trip: Trip) => trip.status === TripStatus.Default,
  };

  const formatEstimate = pipe(
    (estimate: number) => addSeconds(new Date(), estimate),
    {
      remain: (arrival: Date) =>
        formatDistanceToNowStrict(arrival, { locale: zhTW }),

      arrival: (arrival: Date) => format(arrival, "HH:mm"),
    }[display]
  );

  return (
    <List
      classes={{
        wrapper: clsx("pl-8 pr-6 flex flex-col", className),
        list: "mt-4 pr-2 gap-2",
      }}
      title={
        <Title
          className="pr-4"
          title="公車站牌"
          value={display}
          options={[
            { value: "remain", label: "剩餘時間" },
            { value: "arrival", label: "抵達時間" },
          ]}
          onChange={setEstimateDisplay}
        />
      }
      items={data}
    >
      {({ id, name, trip }) =>
        trip &&
        cond<Trip, ReactNode>([
          [
            Case["Unscheduled"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="disable"
                  name={name}
                  id={String(id)}
                  children="今日未營運"
                />
              </Link>
            ),
          ],
          [
            Case["Skipped"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="disable"
                  name={name}
                  id={String(id)}
                  children="此站未停靠"
                />
              </Link>
            ),
          ],
          [
            Case["Terminate"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="disable"
                  name={name}
                  id={String(id)}
                  children="末班車已過"
                />
              </Link>
            ),
          ],
          [
            Case["Not Depart"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="disable"
                  name={name}
                  id={String(id)}
                  children="尚未發車"
                />
              </Link>
            ),
          ],
          [
            Case["Coming"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="arrive"
                  name={name}
                  id={String(id)}
                  children="即將進站"
                />
              </Link>
            ),
          ],
          [
            Case["Arrive"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="arrive"
                  name={name}
                  id={String(id)}
                  children="進站中"
                />
              </Link>
            ),
          ],
          [
            Case["En Route"],
            () => (
              <Link to={{ hash: String(id), pathname: `${pathname}/map` }}>
                <Item.Stop
                  type="default"
                  name={name}
                  id={String(id)}
                  children={formatEstimate(trip.timeOffset)}
                />
              </Link>
            ),
          ],
        ])(trip)
      }
    </List>
  );
}
