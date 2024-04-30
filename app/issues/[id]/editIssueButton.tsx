import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button>
      <Link href={`/issues/edit/${issueId}`}>
        <Flex align="center" gap="1">
          <Pencil2Icon />
          Edit Issue
        </Flex>
      </Link>
    </Button>
  );
};

export default EditIssueButton;
