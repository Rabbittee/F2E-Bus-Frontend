import { useHistory, useLocation } from "react-router";
import clsx from "clsx";

export function MapFigure() {
  const history = useHistory<string>();
  const location = useLocation<string>();
  return (
    <>
      {location.pathname === "/result" || location.pathname === "/stations" ? (
        <div
          className={clsx(
            "px-4 py-2 transition-all duration-500",
            location.pathname === "/result" ? "h-1/2 " : "h-1/3"
          )}
          onClick={() => history.push("/stations")}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1807.4234832145016!2d121.5639777582312!3d25.039266995992516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z5Y-w5YyX5biC5pS_5bqc!5e0!3m2!1szh-TW!2stw!4v1635209335640!5m2!1szh-TW!2stw"
            width="100%"
            height="100%"
            loading="lazy"
            scrolling="no"
            className="pointer-events-none rounded-3xl overflow-hidden"
          ></iframe>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
