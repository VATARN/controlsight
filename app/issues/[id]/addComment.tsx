"use client";

import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextArea } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ButtonSpinner } from "@/app/components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddComment = ({
  issue,
  userId,
}: {
  issue: Issue;
  userId: string | null | undefined;
}) => {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSumbit = async () => {
    try {
      if (commentText === "") {
        toast.error("Comment is required!");
        return;
      }
      setSubmitting(true);
      await axios.post(`/api/issues/${issue.id}/comment`, {
        text: commentText,
        issueId: issue.id,
        userId: userId,
      });
      setCommentText("");
      toast.success("Comment added successfully!");
      router.refresh();
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error("Failed to add comment! Please try again.");
    }
  };

  return (
    <>
      <Flex align="center" gap="2" justify="end">
        <Box maxWidth="70rem" maxHeight="5rem">
          <TextArea
            placeholder="Add a new comment"
            radius="large"
            value={commentText}
            size="3"
            disabled={submitting}
            onChange={(e) => {
              setCommentText(e.target.value);
            }}
          />
        </Box>
        <Button disabled={submitting} onClick={handleSumbit}>
          <Flex align="center" gap="1">
            <ChatBubbleIcon />
            Add
            {submitting && <ButtonSpinner />}
          </Flex>
        </Button>
      </Flex>
      <Toaster />
    </>
  );
};

export default AddComment;
