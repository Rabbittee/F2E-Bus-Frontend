import clsx from "clsx";
import { Icon } from "@/components";

export function Modal() {
  return (
    <div
      className={clsx(
        "h-screen w-screen fixed left-0 top-0 z-40 ",
        "flex justify-center",
        "transition-all duration-500 "
      )}
    >
      <div className="w-full h-full  backdrop-filter backdrop-blur-sm absolute top-0 left-0"></div>
      <div className="w-full h-full bg-black opacity-40 absolute top-0 left-0"></div>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col bg-white z-10 rounded-md p-4 items-center gap-4">
          {/* <span>{Icon.Leaflet.LocationActive}</span> */}
          <p className="text-gray-400">為了更好的協助您...</p>
          <p className="text-dark-green">是否允許網站存取您目前的位置?</p>
          <div className="flex gap-4">
            <button className="py-2 px-8 rounded-full border-2 border-blue">
              拒絕
            </button>
            <button className="py-2 px-8 rounded-full bg-blue text-white">
              拒絕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
