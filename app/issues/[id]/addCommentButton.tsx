"use client";
import { Session } from "next-auth";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextArea } from "@radix-ui/themes";
import { Issue, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { ButtonSpinner } from "@/app/components";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddCommentButton = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchUserID();
  }, []);

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

  const fetchUserID = async () => {
    const res = await axios.get<User[]>("/api/users");
    const user = res.data.filter((user) => user.email === disable?.user!.email);
    setUserId(user[0].id);
  };

  return (
    <>
      <Flex align="center" gap="2" justify="end">
        <Box maxWidth="70rem" maxHeight="5rem">
          <TextArea
            placeholder="Add a new comment"
            radius="large"
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

export default AddCommentButton;
