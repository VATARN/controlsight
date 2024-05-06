import { Session } from "next-auth";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { Issue } from "@prisma/client";

const AddCommentButton = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  return (
    <Button disabled={disable ? false : true}>
      <Link href={"/"}>
        <Flex align="center" gap="1">
          <ChatBubbleIcon />
          Add Comment
        </Flex>
      </Link>
    </Button>
  );
};

export default AddCommentButton;
