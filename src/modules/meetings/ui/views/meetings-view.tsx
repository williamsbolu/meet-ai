"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  // Note: i can also use useQuery for fetching the data. but i had choose the serverside prefetching option. Check reference file for code
  // const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meetings"
      description="Please try again later"
    />
  );
};

// ? 6hr: 23min: expl of errors encountered when passing query params or queryOptions in useSuspenseQuery on the client side ignoring prefetched data on the serverside. causing the useSuspenseQuery to fallback to useQuery ignoring and disabling the prefetch
