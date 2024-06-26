"use client";
import { ButtonSpinner, Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

const AssigneeSelect = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  const router = useRouter();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  const assignIssue = async (userId: string) => {
    axios
      .patch<Issue>(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "none" ? null : userId,
      })
      .then(() => {
        toast.success("Status updated successfully!");
        router.refresh();
      })
      .catch(() => toast.error("Failed to assign user! Please try again."));
  };

  if (error) return <Skeleton />;
  return (
    <>
      <div>
        <Select.Root
          defaultValue={issue.assignedToUserId || "none"}
          onValueChange={assignIssue}
          disabled={disable ? false : true}
        >
          <Select.Trigger placeholder="Assign" />
          <Select.Content>
            <Select.Group>
              {isLoading && <ButtonSpinner />}
              <Select.Label>Suggestions</Select.Label>
              <Select.Item value="none">Unassigned</Select.Item>
              {users?.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
