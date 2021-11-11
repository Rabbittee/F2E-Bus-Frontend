import { Icon } from "@/components";

export function Detail() {
  return (
    <div className="flex justify-between w-full items-center px-7">
      <a className="text-cyan-dark w-3" href="/">
        <Icon.Back />
      </a>

      <h2 className="text-3xl font-bold text-cyan-dark">土城學府路</h2>

      <a className="text-cyan-dark w-6" href="/">
        <Icon.Close />
      </a>
    </div>
  );
}
