import { Icon } from "@/components";

export function Info() {
  return (
    <div className="pt-8 flex flex-1 flex-col gap-4">
      <nav className="w-full">
        <ul className="flex justify-between">
          <li className="border-b border-gray-200 flex-1 text-center text-cyan-dark">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Route className="w-10" />
                <p className="text-base">公車路線</p>
              </span>
            </a>
          </li>
          <li className="border-b rounded-r-xl flex-1 text-center text-cyan-dark">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Map className="w-10" />
                <p className="text-base">公車地圖</p>
              </span>
            </a>
          </li>
          <li className="border-t rounded-tl-xl flex-1 text-center text-orange">
            <a href="#">
              <span className="flex flex-col justify-center items-center py-3">
                <Icon.Info className="w-10" />
                <p className="text-base">公車資訊</p>
              </span>
            </a>
          </li>
        </ul>
      </nav>

      <nav className="pl-10">
        <ul className="flex overflow-x-scroll gap-2 whitespace-nowrap">
          <li className="text-white bg-cyan rounded-full text-lg px-2 py-1 font-bold">
            <a href="#">台北市公車 262</a>
          </li>
          <li className="text-white bg-gray-400 rounded-full text-lg px-2 py-1 font-bold">
            <a href="#">收費方式</a>
          </li>
          <li className="text-white bg-gray-400 rounded-full text-lg px-2 py-1 font-bold">
            <a href="#">平日發車資訊</a>
          </li>
          <li className="text-white bg-gray-400 rounded-full text-lg px-2 py-1 font-bold">
            <a href="#">假日發車資訊</a>
          </li>
        </ul>
      </nav>

      <section className="flex flex-col px-10 text-cyan-dark gap-4">
        <ul className="flex flex-col gap-2 overflow-scroll">
          <li>
            <div className="rounded-xl flex flex-col shadow">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h4 className="text-2xl font-bold">台北市公車 262</h4>
              </div>
              <div className="flex flex-col rounded-b-xl bg-white p-3">
                <p>民生社區</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
