"use client";
import { ButtonSpinner, ErrorMessage } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, TextField, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { PlusCircledIcon, UpdateIcon } from "@radix-ui/react-icons";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred. Please try again.");
    }
  });

  return (
    <div className="max-w-xl">
      <ErrorMessage>{error}</ErrorMessage>
      <Heading>
        {issue ? `Update Issue ${issue.id}` : "Create New Issue"}{" "}
      </Heading>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="mt-4">
          <TextField.Root
            defaultValue={issue?.title}
            className="mb-2"
            placeholder="Title"
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name="description"
            defaultValue={issue?.description}
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <Flex width="100%" justify="end">
          <Button disabled={submitting}>
            {issue ? (
              <Flex align="center" gap="1">
                <UpdateIcon />
                Update Issue
              </Flex>
            ) : (
              <Flex align="center" gap="1">
                <PlusCircledIcon />
                Create Issue
              </Flex>
            )}{" "}
            {submitting && <ButtonSpinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};

export default IssueForm;
