import { EmptyState } from "@/components/empty-state";

export default function CancelledState() {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="The meeting was cancelled"
      />
    </div>
  );
}
