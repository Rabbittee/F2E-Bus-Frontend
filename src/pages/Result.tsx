import { Card, MapFigure } from "@/components";
import clsx from "clsx";

export function Result() {
  return (
    <div className="relative pt-8 flex-1 flex">
      <Card>
        <MapFigure />
        <div
          className={clsx(
            "absolute bottom-0 p-4 rounded-t-2xl w-full max-h-72",
            "bg-white text-cyan-dark",
            "flex flex-col gap-4",
            "animate-upper"
          )}
        >
          <h2 className="text-xl">Station</h2>
          <ul className="flex flex-col gap-2 pr-4 overflow-scroll">
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
            <li className="bg-gray-200 px-3 py-1 rounded-full">
              Xizhi Station
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
