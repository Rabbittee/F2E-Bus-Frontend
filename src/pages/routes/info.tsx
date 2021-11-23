import { useLocation } from "react-router-dom";
import { omit } from "ramda";

import { SubRoutes, List, Item } from "@/components";
import { API, Params } from "@/logic";
import { formatCity, formatDay, Schedule, Day } from "@/models";

type Props = {
  schedule: Schedule;
};
function Departure({ schedule }: Props) {
  type Group = {
    [key in keyof Schedule]?: { title: string; value: string }[];
  };
  const data: Group = {};

  for (const [day, group] of Object.entries(schedule)) {
    //
    for (const value of Object.values(group)) {
      const { max_headway, min_headway, start_time, end_time } = value;

      const items = data[day as Day] || [];

      data[day as Day] = items.concat({
        title: `${start_time} ~ ${end_time}`,
        value: `${min_headway}分至${max_headway}分`,
      });
    }
  }

  return (
    <ul className="grid grid-cols-2 gap-2">
      {Object.entries(data).map(([day, items]) => (
        <li key={day}>
          <strong>{formatDay(day as Day)}</strong>

          <ul className="flex flex-col gap-1 text-sm">
            {items.map(({ title, value }) => (
              <li key={title} className="flex flex-col">
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
      children: <Departure schedule={omit(["saturday", "sunday"], schedule)} />,
    },
    {
      id: "weekend-departure",
      title: "假日發車資訊",
      children: (
        <Departure
          schedule={omit(
            ["monday", "tuesday", "wednesday", "thursday", "friday"],
            schedule
          )}
        />
      ),
    },
  ];

  const location = useLocation();

  return (
    <>
      <SubRoutes
        className="ml-8"
        items={information.map(({ id, title, defaultActive }) => ({
          id,
          name: title,
          to: { hash: id },
          active: location.hash
            ? Boolean(location.hash.match(id))
            : defaultActive,
        }))}
      />

      <List classes={{ wrapper: "px-8 h-full md:pb-8" }} items={information}>
        {({ id, title, children }) => (
          <Item.WithTitle
            id={id}
            color="bg-blue"
            title={<strong className="text-2xl">{title}</strong>}
          >
            {children}
          </Item.WithTitle>
        )}
      </List>
    </>
  );
}
