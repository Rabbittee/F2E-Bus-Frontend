import { Icon } from "@/components";

export function InfoNavBar() {
  return (
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
  );
}

export function Info() {
  return (
    <div className="pt-8 flex flex-1 flex-col gap-4 h-screen">
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

      <InfoNavBar />

      <section className="flex flex-col px-10 text-cyan-dark gap-4 ">
        <ul className="flex flex-col gap-2 overflow-scroll justify-center">
          <li>
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">台北市公車 262</h3>
              </div>
              <div className="flex flex-col rounded-b-xl bg-white p-3">
                <h4 className="font-bold text-lg">
                  民生社區 — 宏國德霖科技大學
                </h4>
              </div>
            </div>
          </li>
          <li>
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">收費方式</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <h4 className="font-bold text-lg">兩段票，每段15元</h4>
                <div className="text-lg">
                  <h4 className="font-bold">分段緩衝區</h4>
                  <p>
                    (往)一女中(重慶)－臺北車站(忠孝)、(返)臺北車站(忠孝)－小南門(和平院區)
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">平日發車資訊</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <div className="text-lg">
                  <h4 className="font-bold">頭末班車</h4>
                  <p>05:30~21:30</p>
                </div>
                <div className="text-lg">
                  <div>
                    <h4 className="font-bold">班距資訊</h4>
                    <h4 className="font-bold">尖峰</h4>
                    <p>12分至15分</p>
                  </div>
                  <div>
                    <h4 className="font-bold">離峰班表</h4>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
