import { Icon } from "@/components";
import { useRecommendQuery } from "@/logic";
import * as Model from "@/models";
import { hash, URLSearchParams } from "@/utils";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ReactNode } from "react";

type Props = Model.Query;
function RecommendSearch({ name, url }: Props) {
  return (
    <Link to={{ pathname: url, search: URLSearchParams({ query: name }) }}>
      <div className="border-b border-blue p-2 flex gap-2">
        <Icon.Clock className="text-dark-green" />

        <strong>{name}</strong>
      </div>
    </Link>
  );
}

type ListProps<T> = {
  title?: string;
  items?: T[];
  children?: (item: T) => ReactNode;
};
function List<T>({ title, items, children }: ListProps<T>) {
  if (!items?.length) return <></>;

  return (
    <div>
      {title && <small className="text-sm text-orange">{title}</small>}

      <ul className="flex flex-col gap-2 my-2">
        {items.map((item) => (
          <li key={hash(JSON.stringify(item))}>{children?.(item)}</li>
        ))}
      </ul>
    </div>
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
      <h2 className="text-2xl font-bold pt-4">試試這些地方...</h2>

      <List title="我附近的巴士站" items={data?.stations}>
        {(data) => <RecommendSearch {...data} />}
      </List>

      <List title="我附近的巴士路線" items={data?.routes}>
        {(data) => <RecommendSearch {...data} />}
      </List>
    </section>
  );
}
