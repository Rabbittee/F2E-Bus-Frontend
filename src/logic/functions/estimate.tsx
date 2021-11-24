import { formatDistanceToNow } from "@/utils";
import { addSeconds } from "date-fns/esm";
import { Trip, TripStatus } from "@/models";

const remain = (estimate?: Trip[]) => (id: string) => {
  if (!estimate) return;

  const item = estimate.find((estimate) => estimate.routeID === id);

  if (!item) return;

  if (item.status === TripStatus.Unscheduled) return "今日未營運";
  if (item.status === TripStatus.NotDepart) return "尚未發車";
  if (item.status === TripStatus.Skipped) return "此站未停靠";
  if (item.status === TripStatus.Terminate) return "尚未發車";
  if (item.timeOffset <= 30) return "進站中";
  if (item.timeOffset <= 60) return "即將進站";

  return formatDistanceToNow(addSeconds(new Date(), item.timeOffset));
};

const status = (estimate?: Trip[]) => (id: string) => {
  if (!estimate) return;

  const item = estimate.find((estimate) => estimate.routeID === id);

  if (!item) return;

  return item.status;
};

export const Estimate = { remain, status };
