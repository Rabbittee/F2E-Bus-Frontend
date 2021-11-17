import clsx from "clsx";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { max } from "ramda";
import { useCallback, useState } from "react";
import { addSeconds } from "date-fns";

import { Icon, Tabs, SwitchToggle, List } from "@/components";
import { API, Query, useSelector } from "@/logic";
import * as Model from "@/models";
import { Direction, Estimate, Has, HasID, HasName } from "@/models";
import { URLSearchParams } from "@/utils";

type Item = HasID & HasName & Has<"active", boolean>;

type SubRoutesProps = {
  className?: string;
  items: Item[];
  query: string;
};
function SubRoutes({ className, items, query }: SubRoutesProps) {
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
              active ? "bg-cyan" : "bg-gray-400"
            )}
          >
            {name}
          </div>
        </Link>
      )}
    </Tabs>
  );
}

type Option = Has<"value", keyof Estimate> & Has<"label", string>;

type TitleProps = {
  className?: string;
  options: Option[];
  value: Option["value"];
  onChange: (value: Option["value"]) => void;
};
function Title({ className, options, value, onChange }: TitleProps) {
  return (
    <div className={clsx("flex justify-between text-cyan-dark", className)}>
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
  name: string;
  estimate: string;
};
function Stop({ name, estimate }: StopProps) {
  return (
    <div
      className={clsx(
        "rounded-full py-2 px-4",
        "flex justify-between items-center",
        "bg-gray-200 text-cyan-dark"
      )}
    >
      <strong className="text-lg">{name}</strong>

      <span>{estimate}</span>
    </div>
  );
}

export default function Arrival() {
  const options: Option[] = [
    { value: "remain", label: "剩餘時間" },
    { value: "arrival", label: "到達時間" },
  ];
  const [display, setEstimateDisplay] = useState<Option["value"]>(
    options[0].value
  );

  const { id } = useParams<"id">();
  const [param] = useSearchParams({
    query: useSelector(Query.selectQuery),
    direction: String(Direction.Departure),
  });
  const searchParam = Object.fromEntries(param.entries());

  const direction = Number(searchParam["direction"]) as Direction;

  const { data: info } = API.useGetRouteInformationQuery(id!, { skip: !id });

  const { data: stops } = API.useGetRouteStopsQuery(
    { id: id!, direction },
    { skip: !id }
  );

  const { data: times } = API.useGetRouteStopEstimateQuery(
    { id: id!, direction },
    { skip: !id, pollingInterval: 5 * 1000 }
  );

  const getTimeByID = useCallback((id) => max(times?.[id] || 0, 0), [times]);

  const data = stops?.map<Model.Stop & { estimate: Estimate }>((stop) => ({
    ...stop,
    estimate: {
      remain: getTimeByID(id),
      arrival: addSeconds(new Date(), getTimeByID(id)),
    },
  }));

  return (
    <div className="pt-4">
      <SubRoutes
        className="ml-8"
        query={searchParam["query"]}
        items={[
          {
            id: Direction.Departure,
            name: `往${info?.departure}`,
            active: direction === Direction.Departure,
          },
          {
            id: Direction.Destination,
            name: `往${info?.destination}`,
            active: direction === Direction.Destination,
          },
        ]}
      />

      <List
        classes={{
          wrapper: "pl-8 pr-6 mt-4",
          list: "mt-4 pr-2 gap-2 max-h-[58vh] overflow-auto cyan-dark-scroll",
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
        {({ name, estimate }) => (
          <Stop name={name} estimate={`${estimate[display]}`} />
        )}
      </List>
    </div>
  );
}
