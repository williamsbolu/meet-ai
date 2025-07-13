import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue?: MeeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValue,
}: UpdateMeetingDialogProps) => {
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValue={initialValue}
      />
    </ResponsiveDialog>
  );
};
