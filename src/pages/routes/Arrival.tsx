import clsx from "clsx";
import { Link } from "react-router-dom";
import { cond, gt, pipe, T } from "ramda";
import { ReactNode, useState } from "react";
import { addSeconds, formatDistanceToNowStrict, format } from "date-fns";
import zhTW from "date-fns/locale/zh-TW";

import { Icon, Tabs, SwitchToggle, List } from "@/components";
import * as Model from "@/models";
import { Estimate, Has, HasID, HasName } from "@/models";
import { URLSearchParams } from "@/utils";

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
        list: "flex whitespace-nowrap overflow-x-scroll gap-4",
      }}
      items={items}
    >
      {({ id, name, active }) => (
        <Link to={{ search: URLSearchParams({ direction: id, query }) }}>
          <div
            className={clsx(
              "rounded-full px-3 py-1",
              active ? "bg-blue" : "bg-gray-400"
            )}
          >
            {name}
          </div>
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

type StopStatus = "Has Departed" | "Arrive" | "Coming Soon";

type StopProps = {
  name: string;
  type?: StopStatus;
  estimate: string;
};
function Stop({ name, type, estimate }: StopProps) {
  return (
    <div
      className={clsx(
        "rounded-full py-2 px-4",
        "flex justify-between items-center",

        type === "Has Departed" && "bg-gray-400 text-gray-200",
        type === "Arrive" && "bg-blue text-white",
        type === "Coming Soon" && "bg-blue text-white",

        type || "bg-gray-200 text-dark-green"
      )}
    >
      <strong className="text-lg">{name}</strong>

      <span>{estimate}</span>
    </div>
  );
}

type StopWithEstimate = Model.Stop & Has<"estimate", number>;

type ListOfStopsProps = {
  data?: StopWithEstimate[];
};
export function ListOfStops({ data }: ListOfStopsProps) {
  const options: Option[] = [
    { value: "remain", label: "剩餘時間" },
    { value: "arrival", label: "到達時間" },
  ];
  const [display, setEstimateDisplay] = useState<Option["value"]>(
    options[0].value
  );

  const Case: Record<StopStatus, (value: number) => boolean> = {
    ["Has Departed"]: gt(0),
    ["Arrive"]: gt(20),
    ["Coming Soon"]: gt(60),
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
      {({ name, estimate }) =>
        cond<number, ReactNode>([
          [
            Case["Has Departed"],
            () => <Stop type="Has Departed" name={name} estimate="尚未發車" />,
          ],
          [
            Case["Arrive"],
            () => <Stop type="Arrive" name={name} estimate="進站中" />,
          ],
          [
            Case["Coming Soon"],
            () => <Stop type="Coming Soon" name={name} estimate="即將進站" />,
          ],
          [T, () => <Stop name={name} estimate={formatEstimate(estimate)} />],
        ])(estimate)
      }
    </List>
  );
}
