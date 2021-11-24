import { Link } from "react-router-dom";
import clsx from "clsx";

import { Icon, List, Item } from "@/components";
import { useRecommendQuery } from "@/logic";
import { URLSearchParams } from "@/utils";
import { Query } from "@/models";

type Props = Query & { address?: string };
function RecommendSearch({ name, url, address }: Props) {
  return (
    <Link to={{ pathname: url, search: URLSearchParams({ query: name }) }}>
      <Item.WithIcon
        icon={
          <div>
            <Icon.Search className="w-6 md:w-8" />
          </div>
        }
      >
        <div className="flex flex-col">
          <strong className="text-lg">{name}</strong>

          {address && (
            <small className="text-sm text-gray-400">{address}</small>
          )}
        </div>
      </Item.WithIcon>
    </Link>
  );
}

export function Home() {
  const data = useRecommendQuery();

  return (
    <section
      className={clsx(
        "px-8 py-2 w-full md:max-w-xl md:px-0 md:mx-auto",
        "flex flex-col",
        "text-dark-green"
      )}
    >
      <h2 className="text-2xl font-bold pt-4 mb-2">試試這些地方...</h2>

      <div className="space-y-4">
        <List
          title={<small className="text-sm text-orange">我附近的巴士站</small>}
          items={data?.stations}
        >
          {RecommendSearch}
        </List>

        <List
          title={
            <small className="text-sm text-orange">我附近的巴士路線</small>
          }
          items={data?.routes}
        >
          {RecommendSearch}
        </List>
      </div>
    </section>
  );
}
