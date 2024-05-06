"use client";
import { Comment, Issue, User } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import { CommentswithUser } from "./showComments";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/app/components";
import dynamic from "next/dynamic";

const AddComment = dynamic(() => import("./addComment"), {
  ssr: false,
  loading: () => <Skeleton height="5rem" />,
});

const ShowComments = dynamic(() => import("./showComments"), {
  ssr: false,
  loading: () => <Skeleton height="10rem" />,
});

const CommentSection = ({
  issue,
  session,
}: {
  issue: Issue;
  session?: Session | null;
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [comments, setComments] = useState<CommentswithUser[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchComments();
  }, [issue]);

  const fetchComments = async () => {
    axios
      .get<CommentswithUser[]>(`/api/issues/${issue.id}/comment`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch comments, Please try again!");
      });
  };

  const fetchUsers = async () => {
    const res = await axios
      .get<User[]>("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error("Failed to fetch users, Please try again!");
      });
  };

  const getUserId = () => {
    if (users.length === 0) return;
    const sessionUser = users.filter(
      (user) => user.email === session?.user?.email
    );
    return sessionUser[0].id;
  };

  return (
    <>
      {session && (
        <div className="mt-4">
          <AddComment issue={issue} userId={getUserId()} />
        </div>
      )}
      <div className="mt-4">
        <ShowComments comments={comments} />
      </div>
      <Toaster />
    </>
  );
};

export default CommentSection;
