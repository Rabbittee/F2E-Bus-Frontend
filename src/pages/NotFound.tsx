import notFoundLogo from "@/assets/svgs/notfound-logo-md.svg";
import notFoundLogoWb from "@/assets/svgs/notfound-logo.svg";
import { Button } from "@/components";
import { SearchParams } from "@/logic";
import { Link } from "react-router-dom";

export function NotFound() {
  const query = SearchParams.useQuery();

  return (
    <div className="px-7 flex flex-col gap-4 max-w-xl text-dark-green">
      <div className="flex flex-col items-center gap-8">
        <img className="xl:hidden" src={notFoundLogo} alt="LOGO" />
        <img className="xl:block hidden" src={notFoundLogoWb} alt="LOGO" />
      </div>

      <div className="text-3xl text-center font-bold space-y-4">
        <h1>Ooops!</h1>
        <h2>你要找的是龍貓公車嗎？</h2>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4">
        <p className="text-blue">查無站牌或公車...</p>

        {query && (
          <div className="flex flex-col items-center text-center space-y-2">
            <p>你剛剛使用的關鍵字是:</p>

            <mark className="text-2xl bg-light-blue text-current px-4 py-1 rounded-xl">
              {query}
            </mark>

            <p>試試其他關鍵字？</p>
          </div>
        )}
      </div>

      <Button>
        <Link to="/">回首頁</Link>
      </Button>
    </div>
  );
}
