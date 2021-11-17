import { Icon, Tabs, SwitchToggle, List } from "@/components";
import clsx from "clsx";

type Props = {
  className?: string;
};
function SubRoutes({ className }: Props) {
  return (
    <Tabs
      classes={{
        wrapper: clsx(className, "text-lg text-white"),
        list: "flex whitespace-nowrap overflow-x-scroll gap-4",
      }}
      items={[
        { id: "1", name: "往台大醫院", active: true },
        { id: "2", name: "往台大醫院" },
        { id: "3", name: "往台大醫院" },
        { id: "4", name: "往台大醫院" },
        { id: "5", name: "往台大醫院" },
        { id: "6", name: "往台大醫院" },
      ]}
    >
      {({ name, active }) => (
        <a href="#">
          <div
            className={clsx(
              "rounded-full px-3 py-1",
              active ? "bg-cyan" : "bg-gray-400"
            )}
          >
            {name}
          </div>
        </a>
      )}
    </Tabs>
  );
}

function PageTabs() {
  return (
    <div className="flex flex-col relative overflow-hidden pt-2">
      <Tabs
        classes={{ list: "flex", item: "flex-1" }}
        items={[
          {
            id: "1",
            name: "公車路線",
            icon: <Icon.Route className="w-9" />,
            active: true,
          },
          { id: "2", name: "公車地圖", icon: <Icon.Map className="w-10" /> },
          { id: "3", name: "公車資訊", icon: <Icon.Info className="w-8" /> },
        ]}
      >
        {({ name, icon, active }) => (
          <div
            className={clsx(
              "h-full py-3 rounded-2xl",
              "flex flex-col justify-end items-center gap-1",
              active
                ? "shadow bg-white text-orange relative z-10"
                : "text-gray-400"
            )}
          >
            {icon}

            <strong>{name}</strong>

            {active && (
              <div className="bg-white h-3 w-full absolute bottom-0" />
            )}
          </div>
        )}
      </Tabs>

      <div className="bg-white shadow h-2 w-full absolute bottom-0" />
    </div>
  );
}

type TitleProps = {
  className?: string;
};
function Title({ className }: TitleProps) {
  return (
    <div className={clsx("flex justify-between text-cyan-dark", className)}>
      <h3 className="text-2xl font-bold">公車站牌</h3>

      <div className="flex gap-1 items-center">
        <strong className="text-sm">到達時間</strong>

        <SwitchToggle
          name="arrival-time-display"
          options={[
            { value: "relative" },
            { value: "absolute" },
            //
          ]}
          value="relative"
          thumb={<Icon.LastTime />}
        />
      </div>
    </div>
  );
}

type StationProps = {
  name: string;
  arrival: string;
};
function Station({ name, arrival }: StationProps) {
  return (
    <div
      className={clsx(
        "rounded-full py-2 px-4",
        "flex justify-between items-center",
        "bg-gray-200 text-cyan-dark"
      )}
    >
      <strong className="text-lg">{name}</strong>

      <span>{arrival}</span>
    </div>
  );
}

export function Routes() {
  return (
    <div className="flex flex-col flex-1">
      <PageTabs />

      <div className="flex-1 pt-4">
        <SubRoutes className="ml-8" />

        <List
          classes={{
            wrapper: "pl-8 pr-6 mt-4",
            list: "mt-4 pr-2 gap-2 max-h-[60vh] overflow-auto cyan-dark-scroll",
          }}
          title={<Title className="pr-4" />}
          items={[
            { id: "1", name: "廣福國小", arrival: "尚未發車" },
            { id: "2", name: "廣福國小", arrival: "尚未發車" },
            { id: "3", name: "廣福國小", arrival: "尚未發車" },
            { id: "4", name: "廣福國小", arrival: "尚未發車" },
            { id: "5", name: "廣福國小", arrival: "尚未發車" },
            { id: "6", name: "廣福國小", arrival: "尚未發車" },
            { id: "7", name: "廣福國小", arrival: "尚未發車" },
            { id: "8", name: "廣福國小", arrival: "尚未發車" },
            { id: "9", name: "廣福國小", arrival: "尚未發車" },
            { id: "10", name: "廣福國小", arrival: "尚未發車" },
          ]}
        >
          {(props) => <Station {...props} />}
        </List>
      </div>
    </div>
  );
}
