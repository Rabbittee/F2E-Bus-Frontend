import { Box, InfoTab } from "@/components";

export function Info() {
  return (
    <div className="pt-4 flex flex-1 flex-col gap-4 relative">
      <Box>
        <InfoTab />

        <ul className="flex flex-col gap-2 overflow-scroll px-2 cyan-scroll w-full ">
          <li id="routeName">
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
          <li id="payment">
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
          <li id="timelist">
            <div className="rounded-xl flex flex-col shadow m-1">
              <div className="flex p-3 bg-cyan text-white rounded-t-xl">
                <h3 className="text-2xl font-bold">平日發車資訊</h3>
              </div>
              <div className="flex flex-col gap-6 rounded-b-xl bg-white p-3">
                <div className="text-lg">
                  <h4 className="font-bold">頭末班車</h4>
                  <p>05:30~21:30</p>
                </div>
                <div className="text-lg flex flex-col gap-3">
                  <div>
                    <h4 className="font-bold">班距資訊</h4>
                    <h4 className="font-bold">尖峰</h4>
                    <p>12分至15分</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">離峰班表</h4>
                    <table className="w-full">
                      <tbody className="flex flex-col gap-3 leading-none">
                        <tr className="flex justify-between ">
                          <td>0530</td>
                          <td>0600</td>
                          <td>0720</td>
                          <td>0740</td>
                          <td>0800</td>
                        </tr>
                        <tr className="flex justify-between bg-cyan rounded-full bg-opacity-40 ">
                          <td>0530</td>
                          <td>0600</td>
                          <td>0720</td>
                          <td>0740</td>
                          <td>0800</td>
                        </tr>
                        <tr className="flex justify-between">
                          <td>0530</td>
                          <td>0600</td>
                          <td>0720</td>
                          <td>0740</td>
                          <td>0800</td>
                        </tr>
                        <tr className="flex justify-between bg-cyan rounded-full bg-opacity-40">
                          <td>0530</td>
                          <td>0600</td>
                          <td>0720</td>
                          <td>0740</td>
                          <td>0800</td>
                        </tr>
                        <tr className="flex justify-between">
                          <td>0530</td>
                          <td>0600</td>
                          <td>0720</td>
                          <td>0740</td>
                          <td>0800</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </Box>
    </div>
  );
}
