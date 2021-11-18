import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { Icon, Map, PageTabs, SubRoutes, ListOfStops } from "@/components";
import { API, Query, useSelector } from "@/logic";
import { Direction } from "@/models";

export function Routes() {
  const location = useLocation();
  const { id } = useParams<"id">();
  const [param] = useSearchParams({
    query: useSelector(Query.selectQuery),
    direction: String(Direction.Departure),
  });
  const searchParam = Object.fromEntries(param.entries());

  const { data: info } = API.useGetRouteInformationQuery(id!, { skip: !id });

  const direction = Number(searchParam["direction"]) as Direction;

  return (
    <div className="flex flex-col flex-1">
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
            to: { ...location, hash: "#map" },
            active: location.hash === "#map",
          },
          {
            id: "3",
            name: "公車資訊",
            icon: <Icon.Info className="w-8" />,
            to: { ...location, hash: "#info" },
            active: location.hash === "#info",
          },
        ]}
      />

      <div className="flex-1">
        <div className="pt-4 flex flex-col gap-2">
          {location.hash === "#map" && (
            <Map className="w-full h-[32vh] px-2 my-2" />
          )}

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

          {location.hash !== "#info" && (
            <ListOfStops id={id} direction={direction} />
          )}
        </div>
      </div>
    </div>
  );
}
