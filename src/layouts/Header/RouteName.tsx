import { Icon, InfoNavBar } from "@/components";

export function RouteName() {
  return (
    <div className="flex flex-col gap-4 w-full  text-orange">
      <div className="flex items-center gap-4 px-7">
        <a className="w-3" href="/stations">
          <Icon.Back />
        </a>

        <h2 className="text-3xl font-bold">262</h2>
      </div>
      <InfoNavBar />
    </div>
  );
}
