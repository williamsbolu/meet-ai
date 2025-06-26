"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function AgentsViewReference() {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useQuery(
    trpc.agents.getMany.queryOptions()
  );

  if (isLoading) {
    return (
      <LoadingState
        title="Loading Agents"
        description="This may take a few seconds"
      />
    );
  }
  if (isError) {
    return (
      <ErrorState
        title="Error Loading Agents"
        description="Please try again later"
      />
    );
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

// An example of using useQuery with a TRPC query for fetching data on client components without server side prefeching which is by default on this project. 4:17:00
