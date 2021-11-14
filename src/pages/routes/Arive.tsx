import { Icon, Box } from "@/components";
import { BASE_URL } from "@/config";
import { useParams } from "react-router-dom";

function fetchStops() {
  const param = useParams();
  const id = param.id;
  const api = BASE_URL;
  const url = `${api}/routes/${id}/stops`;
  console.log(url);
  fetch(`${url}`, { body: JSON.stringify({ route_id: "NWT17664" }) }).then(
    (res) => {
      console.log(res);
    }
  );
}

export function AriveTab() {
  fetchStops();
  return (
    <nav className="pl-4">
      <ul className="flex overflow-x-scroll gap-2 whitespace-nowrap">
        <li className="text-white bg-cyan rounded-full text-lg px-1">
          <a href="#">往台大醫院</a>
        </li>
        <li className="text-white bg-gray-400 rounded-full text-lg px-1">
          <a href="#">往台大醫院</a>
        </li>
        <li className="text-white bg-gray-400 rounded-full text-lg px-1">
          <a href="#">往台大醫院</a>
        </li>
        <li className="text-white bg-gray-400 rounded-full text-lg px-1">
          <a href="#">往台大醫院</a>
        </li>
        <li className="text-white bg-gray-400 rounded-full text-lg px-1">
          <a href="#">往台大醫院</a>
        </li>
      </ul>
    </nav>
  );
}

export function Arive() {
  return (
    <div className="pt-8 flex flex-1 flex-col gap-4 relative">
      <Box>
        <AriveTab />
        <div className="flex justify-between">
          <h3 className="text-2xl">公車站牌</h3>
          <div
            role="group"
            aria-labelledby="arivetime"
            className="flex gap-1 items-center"
          >
            <span id="arivetime font-bold">到達時間</span>
            <div className="flex gap-1 rounded-full relative bg-gray-300 p-0.5">
              <input
                type="radio"
                name="arivetime"
                className="opacity-0 w-5 h-6"
              />
              <input
                type="radio"
                name="arivetime"
                className="opacity-0 w-5 h-6"
              />
              <span className="w-6 h-6 rounded-full absolute bg-white flex justify-center items-center p-0.5">
                <Icon.LastTime />
              </span>
            </div>
          </div>
        </div>
        <ul className="flex flex-col gap-2 overflow-scroll">
          <li>
            <div className="flex rounded-full bg-gray-200 py-2 px-4 justify-between items-center">
              <p>廣福國小</p>
              <small>尚未發車</small>
            </div>
          </li>
          <li>
            <div className="flex rounded-full bg-gray-200 py-2 px-4 justify-between items-center">
              <p>廣福國小</p>
              <small>尚未發車</small>
            </div>
          </li>
          <li>
            <div className="flex rounded-full bg-gray-200 py-2 px-4 justify-between items-center">
              <p>廣福國小</p>
              <small>尚未發車</small>
            </div>
          </li>
          <li>
            <div className="flex rounded-full bg-gray-200 py-2 px-4 justify-between items-center">
              <p>廣福國小</p>
              <small>尚未發車</small>
            </div>
          </li>
        </ul>
      </Box>
    </div>
  );
}
