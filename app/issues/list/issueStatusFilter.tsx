"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Done", value: "DONE" },
    { label: "In Progess", value: "IN_PROGRESS" },
  ];

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "All") params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);

        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues/list${query}`);
      }}
    >
      <Select.Trigger placeholder="Status" />
      <Select.Content>
        <Select.Group>
          {statuses.map((status) => (
            <Select.Item key={status.label} value={status.value || "All"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
