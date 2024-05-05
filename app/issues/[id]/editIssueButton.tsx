import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Session } from "next-auth";

const EditIssueButton = ({
  issueId,
  disable,
}: {
  issueId: number;
  disable: Session | null;
}) => {
  return (
    <Button disabled={disable ? false : true}>
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
