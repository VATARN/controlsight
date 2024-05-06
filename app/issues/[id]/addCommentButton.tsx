"use client";
import { Session } from "next-auth";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextArea } from "@radix-ui/themes";
import { Issue } from "@prisma/client";
import { useState } from "react";
import { set } from "zod";

const AddCommentButton = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  const [commentText, setCommentText] = useState("");

  const handleSumbit = () => {
    console.log("Comment added: ", commentText);
    setCommentText("");
  };

  return (
    <>
      <Flex align="center" gap="2" justify="end">
        <Box maxWidth="70rem" maxHeight="5rem">
          <TextArea
            placeholder="Add a new comment"
            radius="large"
            size="3"
            disabled={disable ? false : true}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
        </Box>
        <Button disabled={disable ? false : true} onClick={handleSumbit}>
          <Flex align="center" gap="1">
            <ChatBubbleIcon />
            Add
          </Flex>
        </Button>
      </Flex>
    </>
  );
};

export default AddCommentButton;
