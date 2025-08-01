"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import UpcomingState from "../components/upcoming-state";
import ActiveState from "../components/active-state";
import CancelledState from "../components/cancelled-state";
import ProcessingState from "../components/processing-state";
import { CompletedState } from "../components/completed-state";

interface Props {
  meetingId: string;
}

const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));

        // Invalidate free tier usage
        queryClient.invalidateQueries(trpc.premium.getFreeUsage.queryOptions());

        router.push("/meetings");
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting`
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    removeMeeting.mutate({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValue={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingName={data.name}
          meetingId={meetingId}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />

        {isUpcoming && (
          <UpcomingState meetingId={meetingId} isCancelling={false} />
        )}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <CompletedState data={data} />}
      </div>
    </>
  );
};

export const MeetingsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingsIdViewError = () => {
  return (
    <ErrorState
      title="Error Loading Meeting"
      description="Please try again later"
    />
  );
};

export default MeetingIdView;
