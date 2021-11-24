import { useLocation } from "react-router-dom";
import { omit } from "ramda";

import { SubRoutes, List, Item } from "@/components";
import { API, Params } from "@/logic";
import { formatCity, formatDay, Schedule, Day } from "@/models";
import { format, max, min, parse, startOfToday } from "date-fns";
import { endOfToday } from "date-fns/esm";

type Props = {
  title?: string;
  schedule: Schedule;
};
function Departure({ title, schedule }: Props) {
  type Group = {
    [key in keyof Schedule]?: { title?: string; value: string }[];
  };

  let type: "flexible" | "regular" | undefined;
  const data: Group = {};

  for (const [day, group] of Object.entries(schedule)) {
    //
    for (const value of Object.values(group)) {
      type = value.type;

      if (value.type === "regular") {
        const { arrival_time } = value;

        const items = data[day as Day] || [];

        data[day as Day] = items.concat({
          value: arrival_time.replace(":", ""),
        });
      }

      if (value.type === "flexible") {
        const { max_headway, min_headway, start_time, end_time } = value;

        const items = data[day as Day] || [];

        data[day as Day] = items.concat({
          title: `${start_time} ~ ${end_time}`,
          value: `${min_headway}分至${max_headway}分`,
        });
      }
    }
  }

  if (type === "regular") {
    return (
      <div>
        <strong>{title}</strong>

        <ul className="flex flex-col gap-2">
          {Object.entries(data).map(([day, items]) => (
            <li key={day}>
              <strong>{formatDay(day as Day)}</strong>

              <ul className="grid grid-cols-5 gap-1 text-sm">
                {items.map(({ value }) => (
                  <li key={value} className="flex flex-col text-dark-green">
                    {value}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-2">
      {Object.entries(data).map(([day, items]) => (
        <li key={day}>
          <strong>{formatDay(day as Day)}</strong>

          <ul className="flex flex-col gap-1 text-sm">
            {items.map(({ title, value }) => (
              <li key={title} className="flex flex-col text-dark-green">
                <strong>{title}</strong>

                <span>{value}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function StartEnd({ title, schedule }: Props) {
  const getEndOfSchedule = (schedule: Schedule) => {
    let end = startOfToday();

    for (const group of Object.values(schedule)) {
      if (Array.isArray(group)) {
        end = max(
          group
            .map(({ arrival_time }) => parse(arrival_time, "HH:mm", new Date()))
            .concat(end)
        );
      }
    }

    return format(end, "HH:mm");
  };

  const getStartOfSchedule = (schedule: Schedule) => {
    let start = endOfToday();

    for (const group of Object.values(schedule)) {
      if (Array.isArray(group)) {
        start = min(
          group
            .map(({ arrival_time }) => parse(arrival_time, "HH:mm", new Date()))
            .concat(start)
        );
      }
    }

    return format(start, "HH:mm");
  };

  return (
    <div>
      <strong>{title}</strong>

      <p>
        <span>
          {getStartOfSchedule(
            omit(
              ["monday", "tuesday", "wednesday", "thursday", "friday"],
              schedule
            )
          )}
        </span>

        <span>~</span>

        <span>{getEndOfSchedule(omit(["saturday", "sunday"], schedule))}</span>
      </p>
    </div>
  );
}

export default function Info() {
  const id = Params.useID();

  const { city, name, departure, destination, price } =
    API.useGetRouteInformationQuery(id!, {
      skip: !id,
      selectFromResult: ({ data }) => ({
        city: data?.city,
        name: data?.name,
        departure: data?.departure,
        destination: data?.destination,
        price: data?.price,
      }),
    });

  const { data: schedule } = API.useGetRouteScheduleQuery(id!, { skip: !id });

  const information = [
    {
      id: "title",
      title: `${city && formatCity(city)} ${name}`,
      defaultActive: true,
      children: (
        <strong>
          {departure} - {destination}
        </strong>
      ),
    },
    {
      id: "rare",
      title: "收費方式",
      children: (
        <>
          <strong>{price?.description}</strong>

          {price?.buffer && <span>{price.buffer}</span>}
        </>
      ),
    },
    {
      id: "weekday-departure",
      title: "平日發車資訊",
      children: schedule && (
        <div className="space-y-4">
          <StartEnd title="頭末班車" schedule={schedule} />

          <Departure
            title="班距資訊"
            schedule={omit(["saturday", "sunday"], schedule)}
          />
        </div>
      ),
    },
    {
      id: "weekend-departure",
      title: "假日發車資訊",
      children: schedule && (
        <div className="space-y-4">
          <StartEnd title="頭末班車" schedule={schedule} />

          <Departure
            title="班距資訊"
            schedule={omit(
              ["monday", "tuesday", "wednesday", "thursday", "friday"],
              schedule
            )}
          />
        </div>
      ),
    },
  ];

  const location = useLocation();

  return (
    <div className="pt-4 pb-8 flex flex-col gap-2 h-full">
      <SubRoutes
        className="ml-8 md:ml-0"
        items={information.map(({ id, title, defaultActive }) => ({
          id,
          name: title,
          to: { hash: id },
          active: location.hash
            ? Boolean(location.hash.match(id))
            : defaultActive,
        }))}
      />

      <List
        classes={{ wrapper: "px-8 md:px-0 h-full", list: "md:pb-8" }}
        items={information}
      >
        {({ id, title, children }) => (
          <Item.WithTitle
            id={id}
            classes={{ title: "bg-blue", content: "text-dark-green" }}
            title={<strong className="text-2xl">{title}</strong>}
          >
            {children}
          </Item.WithTitle>
        )}
      </List>
    </div>
  );
}
