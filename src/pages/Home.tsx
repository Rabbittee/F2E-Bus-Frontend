import { Icon } from "@/components";
import { API, Geo, Query, useSelector } from "@/logic";
import * as Model from "@/models";
import clsx from "clsx";
import { Link } from "react-router-dom";

type Props = Model.Query;
function RecommandSearch({ id, name, url }: Props) {
  return (
    <Link to={`result/${id}`}>
      <div className="border-b border-cyan p-2 flex gap-2">
        <Icon.Clock className="text-cyan-dark" />

        <strong>{name}</strong>
      </div>
    </Link>
  );
}

export function Home() {
  const query = useSelector(Query.selectQuery);
  const location = useSelector(Geo.selectPosition);
  const { data } = API.useGetRecommendQueryQuery(
    { query, location },
    { skip: !query.length && !location }
  );

  return (
    <section className="px-7 flex flex-col gap-3 text-cyan-dark">
      <div>
        <h2 className="text-2xl font-bold pt-4">試試這些地方...</h2>
        <small className="text-sm text-orange">我附近的巴士站</small>
      </div>

      <ul className="flex flex-col gap-2 max-h-72 overflow-auto">
        {data?.map((recommand) => (
          <li key={recommand.id}>
            <RecommandSearch {...recommand} />
          </li>
        ))}
      </ul>
    </section>
  );
}
