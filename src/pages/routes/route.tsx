import { SubRoutes, ListOfStops } from "@/components";
import { Direction } from "@/models";
import { URLSearchParams } from "@/utils";
import { API, SearchParams, Params } from "@/logic";

export default function Route() {
  const id = Params.useID();
  const query = SearchParams.useQuery();
  const direction = SearchParams.useDirection();

  const { data: stops } = API.useGetRouteStopsQuery(
    { id: id!, direction },
    { skip: !id }
  );

  const { departure, destination } = API.useGetRouteInformationQuery(id!, {
    skip: !id,
    selectFromResult: ({ data }) => ({
      departure: data?.departure,
      destination: data?.destination,
    }),
  });

  return (
    <div className="pt-4 pb-8 flex flex-col gap-2 h-full">
      <SubRoutes
        className="ml-8"
        items={[
          {
            id: Direction.Departure,
            name: `往${destination}`,
            to: {
              search: URLSearchParams({
                direction: Direction.Departure,
                query,
              }),
            },
            active: direction === Direction.Departure,
          },
          {
            id: Direction.Destination,
            name: `往${departure}`,
            to: {
              search: URLSearchParams({
                direction: Direction.Destination,
                query,
              }),
            },
            active: direction === Direction.Destination,
          },
        ]}
      />

      <ListOfStops
        className="h-full md:pb-8"
        id={id}
        stops={stops}
        direction={direction}
      />
    </div>
  );
}
