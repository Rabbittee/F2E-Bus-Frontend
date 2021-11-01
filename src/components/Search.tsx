import { useHistory } from "react-router";
import clsx from "clsx";

export function Search() {
  const history = useHistory<string>();
  return (
    <div className="px-7 flex flex-col">
      <button
        className={clsx("bg-cyan-dark text-white rounded-full ", "my-4 py-2.5")}
        type="button"
        onClick={() => history.push("/result")}
      >
        搜尋
      </button>
    </div>
  );
}
