import { Icon } from "@/components";

export function RouteName() {
  return (
    <div className="flex gap-4 w-full items-center text-orange">
      <a className="w-3" href="/stations">
        <Icon.Back />
      </a>

      <h2 className="text-3xl font-bold">262</h2>
    </div>
  );
}
