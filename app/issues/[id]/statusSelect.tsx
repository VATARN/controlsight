"use client";
import { Issue } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import axios from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const StatusSelect = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  const router = useRouter();
  const statuses: { label: string; value: string }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progess", value: "IN_PROGRESS" },
    { label: "Done", value: "DONE" },
  ];

  const assignStatus = async (status: string) => {
    axios
      .patch<Issue>(`/api/issues/${issue.id}`, {
        status: status,
      })
      .then(() => {
        toast.success("Status updated successfully!");
        router.refresh();
      })
      .catch(() =>
        toast.error("Failed to update the status! Please try again.")
      );
  };

  return (
    <>
      <Flex align="center" gap="1">
        <Select.Root
          defaultValue={issue.status || "OPEN"}
          onValueChange={assignStatus}
          disabled={disable ? false : true}
        >
          <Select.Trigger placeholder="Assign" />
          <Select.Content>
            <Select.Group>
              <Select.Label>Suggestions</Select.Label>
              {statuses?.map((status) => (
                <Select.Item key={status.label} value={status.value}>
                  {status.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Flex>
      <Toaster />
    </>
  );
};

export default StatusSelect;
