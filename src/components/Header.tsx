import { Input } from "@/components";
import clsx from "clsx";

export function Header() {
  return (
    <header
      className={clsx(
        "flex flex-col justify-center flex-1 items-center",
        "gap-6 pt-12"
      )}
    >
      <h2 className="text-3xl font-bold">Where would you like to go today?</h2>

      <div className="flex flex-col w-full gap-4">
        <Input />

        <button className="bg-blue-600 text-white py-2.5 rounded-md">
          Search
        </button>
      </div>
    </header>
  );
}
