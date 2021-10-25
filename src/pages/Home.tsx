import { Icon } from "@/components";

type Props = {
  query: string;
  href: string;
};
function RecommandSearch({ query, href }: Props) {
  return (
    <a href={href}>
      <div className="border-b border-gray-800 p-2 flex gap-2">
        <Icon.Clock className="text-gray-500" />

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
    <section className="w-full h-screen  flex flex-col gap-3">
      <h2 className="text-xl">Try Searching</h2>

      <p>Bus station nearby me</p>

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
