import { useSelector } from "react-redux";
import { API } from "@/logic/api";
import { Query, Geo } from "@/logic/slices";
import * as Model from "@/models";

export function useRecommendQuery(): Model.Query[] | undefined {
  const query = useSelector(Query.selectQuery);
  const location = useSelector(Geo.selectPosition);
  const { data } = API.useGetRecommendQueryQuery(
    { query, location },
    { skip: !query.length && !location }
  );

  if (!data) return;

  const { routes, stations } = data;

  return [
    ...routes.map(({ id, name }) => ({
      id,
      name,
      url: `routes/${id}`,
    })),

    ...stations.map(({ id, name }) => ({
      id,
      name,
      url: `stations/${id}`,
    })),
  ];
}
