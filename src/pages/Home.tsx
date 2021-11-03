import { Icon } from "@/components";
import { API } from "@/logic";
import { Query } from "@/models";
import clsx from "clsx";

type Props = Query;
function RecommandSearch({ name, url }: Props) {
  return (
    <a href={url}>
      <div className="border-b border-cyan p-2 flex gap-2">
        <Icon.Clock className="text-cyan-dark" />

        <span>{name}</span>
      </div>
    </a>
  );
}

export function Home() {
  const { data } = API.useGetRecommendQueryQuery();

  return (
    <section
      className={clsx(
        "w-full h-screen mt-6 px-7",
        "flex flex-col gap-3",
        " text-cyan-dark"
      )}
    >
      <div>
        <h2 className="text-xl pt-4">試試這些地方...</h2>
        <small className="text-orange">我附近的巴士站</small>
      </div>

      <ul className="flex flex-col gap-2">
        {data?.map((recommand) => (
          <li key={recommand.id}>
            <RecommandSearch {...recommand} />
          </li>
        ))}
      </ul>
    </section>
  );
}
