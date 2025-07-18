import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type MeeetingGetMany =
  inferRouterOutputs<AppRouter>["meetings"]["getMany"]["items"];
export type MeeetingGetOne =
  inferRouterOutputs<AppRouter>["meetings"]["getOne"];

export enum MeetingStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Processing = "processing",
  Cancelled = "cancelled",
}

export type StreamTranscriptItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};
