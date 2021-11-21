import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { latLng, latLngBounds } from "leaflet";
import { Marker, Polyline, useMap } from "react-leaflet";
import { omit } from "ramda";
import clsx from "clsx";

import {
  Icon,
  Map,
  PageTabs,
  SubRoutes,
  ListOfStops,
  List,
  Item,
} from "@/components";
import { API, Query, useSelector } from "@/logic";
import { Direction, City, Day, Schedule, Stop } from "@/models";
import { URLSearchParams } from "@/utils";
import { useEffect, useState } from "react";

function formatCity(city: City) {
  return {
    Taipei: "臺北市",
    NewTaipei: "新北市",
    Taoyuan: "桃園市",
    Taichung: "臺中市",
    Tainan: "臺南市",
    Kaohsiung: "高雄市",
    Keelung: "基隆市",
    Hsinchu: "新竹市",
    HsinchuCounty: "新竹縣",
    MiaoliCounty: "苗栗縣",
    ChanghuaCounty: "彰化縣",
    NantouCounty: "南投縣",
    YunlinCounty: "雲林縣",
    ChiayiCounty: "嘉義縣",
    Chiayi: "嘉義市",
    PingtungCounty: "屏東縣",
    YilanCounty: "宜蘭縣",
    HualienCounty: "花蓮縣",
    TaitungCounty: "臺東縣",
    KinmenCounty: "金門縣",
    PenghuCounty: "澎湖縣",
    LienchiangCounty: "連江縣",
  }[city];
}

function formatDay(day: Day) {
  return {
    monday: "週一",
    tuesday: "週二",
    wednesday: "週三",
    thursday: "週四",
    friday: "週五",
    saturday: "週六",
    sunday: "週日",
  }[day];
}

type Item = { title: string; value: string };
type GroupByDay = {
  [key in Day]?: Item[];
};

function groupbyDay(schedule: Schedule) {
  const map: GroupByDay = {};

  for (const group of Object.values(schedule)) {
    //
    for (const value of Object.values(group)) {
      const { day, max_headway, min_headway, start_time, end_time } = value;

      const items = map[day as Day] || [];
      map[day as Day] = items.concat({
        title: `${start_time} ~ ${end_time}`,
        value: `${min_headway}分至${max_headway}分`,
      });
    }
  }

  return map;
}

function formatDeparture(data: Schedule) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {Object.entries<Item[]>(groupbyDay(data)).map(([day, items]) => (
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

type StopsProps = {
  stops?: Stop[];
};
function Stops({ stops }: StopsProps) {
  const map = useMap();

  const canShow = () => map.getMaxZoom() - map.getZoom() <= 4;

  const [show, setShow] = useState(canShow());

  useEffect(() => {
    const zoom = () => setShow(canShow());

    map.addEventListener("zoom", zoom);

    return () => void map.removeEventListener("zoom", zoom);
  }, [map]);

  if (!show) return <></>;

  return (
    <>
      {stops?.map((stop) => (
        <Marker
          key={String(stop.id)}
          icon={Icon.Leaflet.Location}
          position={[stop.position.lat, stop.position.lon]}
        />
      ))}
    </>
  );
}

type RouteMapProps = {
  stops?: Stop[];
  isWeb?: boolean;
};
function RouteMap({ stops, isWeb }: RouteMapProps) {
  const points = stops?.map(({ position }) =>
    latLng(position.lat, position.lon)
  );

  return (
    <Map
      className={clsx(
        "w-full md:h-[68vh] h-[32vh] px-2 my-2",
        isWeb ? "md:block hidden" : "md:hidden"
      )}
      bounds={points && latLngBounds(points)}
    >
      <Stops stops={stops} />

      {points && <Polyline positions={points} />}
    </Map>
  );
}

export function Routes() {
  const location = useLocation();
  const { id } = useParams<"id">();
  const [param] = useSearchParams({
    query: useSelector(Query.selectQuery),
    direction: String(Direction.Departure),
  });
  const searchParam = Object.fromEntries(param.entries());

  const { data: info } = API.useGetRouteInformationQuery(id!, { skip: !id });

  const { data: schedule } = API.useGetRouteScheduleQuery(id!, { skip: !id });

  const direction = Number(searchParam["direction"]) as Direction;

  const { data: stops } = API.useGetRouteStopsQuery(
    { id: id!, direction },
    { skip: !id }
  );

  if (!info) return <></>;

  const information = [
    {
      id: "title",
      title: `${formatCity(info.city)} ${info.name}`,
      children: (
        <strong>
          {info.departure} - {info.destination}
        </strong>
      ),
    },
    {
      id: "rare",
      title: "收費方式",
      children: (
        <>
          <strong>{info.price.description}</strong>

          {info.price.buffer && <span>{info.price.buffer}</span>}
        </>
      ),
    },
    {
      id: "weekday-departure",
      title: "平日發車資訊",
      children: formatDeparture(omit(["saturday", "sunday"], schedule)),
    },
    {
      id: "weekend-departure",
      title: "假日發車資訊",
      children: formatDeparture(
        omit(["monday", "tuesday", "wednesday", "thursday", "friday"], schedule)
      ),
    },
  ];

  const matchInfo = (hash: string) =>
    information.some(({ id }) => hash.includes(id));

  return (
    <div className="flex flex-col flex-1 text-dark-green md:flex-row">
      <PageTabs
        items={[
          {
            id: "1",
            name: "公車路線",
            icon: <Icon.Route className="w-9" />,
            to: { ...location, hash: undefined },
            active: !location.hash,
          },
          {
            id: "2",
            name: "公車地圖",
            icon: <Icon.Map className="w-10" />,
            to: { ...location, hash: "map" },
            active: location.hash === "#map",
          },
          {
            id: "3",
            name: "公車資訊",
            icon: <Icon.Info className="w-8" />,
            to: { ...location, hash: information[0].id },
            active: matchInfo(location.hash),
          },
        ]}
      >
        <RouteMap isWeb={true} />
      </PageTabs>

      <div
        className={clsx(
          "flex-1 md:flex-[5]",
          location.hash === "#map" ? "md:hidden" : ""
        )}
      >
        <div className="pt-4 pb-8 flex flex-col gap-2">
          {matchInfo(location.hash) && (
            <>
              <SubRoutes
                className="ml-8"
                items={information.map(({ id, title }) => ({
                  id,
                  name: title,
                  to: {
                    hash: id,
                    query: searchParam["query"],
                  },
                  active: Boolean(location.hash.match(id)),
                }))}
              />

              <List classes={{ wrapper: "px-8" }} items={information}>
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
          )}

          {!matchInfo(location.hash) && (
            <>
              {location.hash === "#map" && (
                <RouteMap isWeb={false} stops={stops} />
              )}

              <SubRoutes
                className="ml-8"
                items={[
                  {
                    id: Direction.Departure,
                    name: `往${info.departure}`,
                    to: {
                      search: URLSearchParams({
                        direction: Direction.Departure,
                        query: searchParam["query"],
                      }),
                    },
                    active: direction === Direction.Departure,
                  },
                  {
                    id: Direction.Destination,
                    name: `往${info.destination}`,
                    to: {
                      search: URLSearchParams({
                        direction: Direction.Destination,
                        query: searchParam["query"],
                      }),
                    },
                    active: direction === Direction.Destination,
                  },
                ]}
              />

              <ListOfStops
                id={id}
                stops={stops}
                direction={direction}
                className={clsx(
                  location.hash.includes("map")
                    ? "max-h-[24vh]"
                    : "max-h-[66vh]"
                )}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
