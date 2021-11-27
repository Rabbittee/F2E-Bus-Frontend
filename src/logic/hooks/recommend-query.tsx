import { useSelector } from "react-redux";
import { useEffect } from "react";

import { API } from "@/logic";
import { Query, Geo } from "@/logic/slices";
import * as Model from "@/models";
import { debounce } from "@/utils";
import {
  both,
  complement,
  cond,
  identity,
  isEmpty,
  isNil,
  propSatisfies,
  T,
} from "ramda";
import { formatCity } from "@/models";

type ExecuteProps = Partial<{
  query: string;
  location: Model.Geo.Position;
  trigger: ({ query, location }: Omit<ExecuteProps, "trigger">) => void;
}>;

const IsSearchQueryEmpty =
  //
  propSatisfies(isEmpty, "query");

const IsGeolocationEmpty =
  //
  propSatisfies(isNil, "location");

const Situation = {
  "User typing search query": complement(IsSearchQueryEmpty),
  "User enable geolocation || Get geolocation by IP": both(
    IsSearchQueryEmpty,
    complement(IsGeolocationEmpty)
  ),
  Default: T,
};

const execute = debounce(({ query, location, trigger }: ExecuteProps) => {
  if (!trigger) throw new Error("execution trigger should not be empty.");

  return cond([
    [Situation["User typing search query"], ({ query }) => trigger({ query })],
    [
      Situation["User enable geolocation || Get geolocation by IP"],
      ({ location }) => trigger({ location }),
    ],
    [Situation["Default"], identity],
  ])({ query, location, trigger });
});

type RecommendQueries = {
  routes: Model.Query[];
  stations: Model.Query[];
};

export function useRecommendQuery(): RecommendQueries | undefined {
  const query = useSelector(Query.selectQuery);
  const location = useSelector(Geo.selectPosition);
  const [trigger, { data }] = API.useLazyGetRecommendQueryQuery();

  useEffect(
    () => execute({ query, location, trigger }),
    [query, location]
    //
  );

  if (!data) return;

  const { routes, stations } = data;

  return {
    routes: routes.map(({ id, name, city }) => ({
      id,
      name,
      url: `routes/${String(id)}`,
      address: formatCity(city),
    })),

    stations: stations.map(({ id, name, address }) => ({
      id,
      name,
      url: `stations/${String(id)}`,
      address,
    })),
  };
}
