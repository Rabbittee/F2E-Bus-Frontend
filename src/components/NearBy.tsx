import clsx from "clsx";

export function NearBy() {
  return (
    <div
      className={clsx(
        "absolute bottom-0 p-4 rounded-t-2xl w-full max-h-72",
        " text-cyan-dark",
        "flex flex-col gap-4",
        "animate-upper"
      )}
    >
      <h2 className="text-xl">附近的站牌</h2>
      <ul className="flex flex-col gap-2 pr-4 overflow-scroll">
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
        <li className="bg-cyan-dark px-3 py-2 rounded-full text-white">
          廣福國小
        </li>
      </ul>
    </div>
  );
}
