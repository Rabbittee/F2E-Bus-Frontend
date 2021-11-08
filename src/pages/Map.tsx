import { Icon, MapFigure } from "@/components";

export function Map() {
  return (
    <div className="pt-8 flex flex-1 flex-col gap-4">
      <nav className="w-full">
        <ul className="flex justify-between">
          <li className="border-b border-gray-200 rounded-xl flex-1 text-center text-cyan-dark">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Route className="w-10" />
                <p className="text-base">公車路線</p>
              </span>
            </a>
          </li>
          <li className="shadow-tab rounded-xl flex-1 text-center text-orange">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Map className="w-10" />
                <p className="text-base">公車地圖</p>
              </span>
            </a>
          </li>
          <li className="border-b rounded-bl-xl shadow-tabInset flex-1 text-center text-cyan-dark">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Info className="w-10" />
                <p className="text-base">公車資訊</p>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <MapFigure />

      <nav className="pl-10">
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

      <section className="flex flex-col px-10 text-cyan-dark gap-4">
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
      </section>
    </div>
  );
}
