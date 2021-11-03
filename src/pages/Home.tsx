import { Icon } from "@/components";
import clsx from "clsx";

type Props = {
  query: string;
  href: string;
};
function RecommandSearch({ query, href }: Props) {
  return (
    <a href={href}>
      <div className="border-b border-cyan p-2 flex gap-2">
        <Icon.Clock className="text-cyan-dark" />

        <span>{query}</span>
      </div>
    </a>
  );
}

export function Home() {
  const recommands = [
    {
      query: "Station A",
      href: "#",
    },
    {
      query: "Station B",
      href: "#",
    },
    {
      query: "Station C",
      href: "#",
    },
  ];

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
        {recommands.map((recommand) => (
          <li key={recommand.query}>
            <RecommandSearch {...recommand} />
          </li>
        ))}
      </ul>
    </section>
  );
}
