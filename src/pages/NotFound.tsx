import notFoundLogo from "@/assets/svgs/notfound-logo-md.svg";
import notFoundLogoWb from "@/assets/svgs/notfound-logo.svg";
import { Button } from "@/components";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="px-7 flex flex-col gap-4 max-w-xl ">
      <div className="flex flex-col items-center gap-8">
        <img className="xl:hidden" src={notFoundLogo} alt="LOGO" />
        <img className="xl:block hidden" src={notFoundLogoWb} alt="LOGO" />
      </div>
      <p className="text-3xl text-center font-bold text-dark-green">Ooops!</p>
      <p className="text-3xl text-center font-bold text-dark-green">
        你要找的是龍貓公車嗎？
      </p>
      <div className="flex flex-col  gap-8  justify-center items-center">
        <p className="text-blue">查無站牌或公車...</p>
      </div>

      <Button>
        <Link to="/">回首頁</Link>
      </Button>
    </div>
  );
}
