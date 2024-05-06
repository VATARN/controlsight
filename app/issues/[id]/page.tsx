import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./editIssueButton";
import IssueDetails from "./issueDetails";
import DeleteIssueButton from "./deleteIssueButton";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./assigneeSelect";
import { cache } from "react";
import AddCommentButton from "./addCommentButton";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: { id: issueId },
  })
);

const IssueDetail = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  if (typeof params.id !== "string") notFound();

  const issue = await fetchUser(parseInt(params.id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} disable={session} />
        <div className="mt-4">
          <AddCommentButton issue={issue} disable={session} />
        </div>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} disable={session} />
          <EditIssueButton issueId={issue.id} disable={session} />
          <DeleteIssueButton issueId={issue.id} disable={session} />
        </Flex>
      </Box>
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetail;
