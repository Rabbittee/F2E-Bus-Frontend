import clsx from "clsx";
import { Link } from "react-router-dom";
import { cond, gt, pipe, T } from "ramda";
import { ReactNode, useState } from "react";
import { addSeconds, formatDistanceToNowStrict, format } from "date-fns";
import zhTW from "date-fns/locale/zh-TW";

import { Icon, Tabs, SwitchToggle, List, Badge } from "@/components";
import {
  Direction,
  Estimate,
  Has,
  HasID,
  HasName,
  Trip,
  TripStatus,
} from "@/models";
import { URLSearchParams } from "@/utils";
import { API } from "@/logic";

type Item = HasID & HasName & Has<"active", boolean>;
type Option = Has<"value", keyof Estimate> & Has<"label", string>;

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

type TitleProps = {
  className?: string;
  options: Option[];
  value: Option["value"];
  onChange: (value: Option["value"]) => void;
};
function Title({ className, options, value, onChange }: TitleProps) {
  return (
    <div className={clsx("flex justify-between text-dark-green", className)}>
      <h3 className="text-2xl font-bold">公車站牌</h3>

      <div className="flex gap-1 items-center">
        <strong className="text-sm">
          {options.find((option) => option.value === value)?.label}
        </strong>

        <SwitchToggle
          name="arrival-time-display"
          options={options}
          value={value}
          onChange={onChange}
          thumb={<Icon.LastTime />}
        />
      </div>
    </div>
  );
}

type StopProps = {
  type: "default" | "arrive" | "disable";
  name: string;
  children: ReactNode;
};
function Stop({ name, type, children }: StopProps) {
  return (
    <div
      className={clsx(
        "rounded-full py-2 px-4",
        "flex justify-between items-center",

        type === "disable" && "bg-gray-400 text-gray-200",
        type === "arrive" && "bg-blue text-white",
        type === "default" && "bg-gray-200 text-dark-green"
      )}
    >
      <strong className="text-lg">{name}</strong>

      <span>{children}</span>
    </div>
  );
}

type Props = {
  id?: string;
  direction: Direction;
};
export function ListOfStops({ id, direction }: Props) {
  const { data: trips } = API.useGetRouteStopEstimateQuery(
    { id: id!, direction },
    {
      skip: !id,
      pollingInterval: 5 * 1000,
    }
  );

  const { data: stops } = API.useGetRouteStopsQuery(
    { id: id!, direction },
    { skip: !id }
  );
  const data = stops?.map((stop) => ({
    ...stop,
    trip: trips?.find(({ stationID }) => stationID === stop.id),
  }));

  const options: Option[] = [
    { value: "remain", label: "剩餘時間" },
    { value: "arrival", label: "到達時間" },
  ];
  const [display, setEstimateDisplay] = useState<Option["value"]>(
    options[0].value
  );

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
        wrapper: "pl-8 pr-6 mt-4",
        list: "mt-4 pr-2 gap-2 max-h-[58vh] overflow-auto dark-green-scroll",
      }}
      title={
        <Title
          className="pr-4"
          value={display}
          options={options}
          onChange={setEstimateDisplay}
        />
      }
      items={data}
    >
      {({ name, trip }) =>
        trip &&
        cond<Trip, ReactNode>([
          [
            Case["Unscheduled"],
            () => <Stop type="disable" name={name} children="今日未營運" />,
          ],
          [
            Case["Skipped"],
            () => <Stop type="disable" name={name} children="此站未停靠" />,
          ],
          [
            Case["Terminate"],
            () => <Stop type="disable" name={name} children="末班車已過" />,
          ],
          [
            Case["Not Depart"],
            () => <Stop type="disable" name={name} children="尚未發車" />,
          ],
          [
            Case["Coming"],
            () => <Stop type="arrive" name={name} children="即將進站" />,
          ],
          [
            Case["Arrive"],
            () => <Stop type="arrive" name={name} children="進站中" />,
          ],
          [
            Case["En Route"],
            () => (
              <Stop
                type="default"
                name={name}
                children={formatEstimate(trip.timeOffset)}
              />
            ),
          ],
        ])(trip)
      }
    </List>
  );
}
