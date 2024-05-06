import { Issue } from "@prisma/client";
import { Heading, Flex, Card } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import StatusSelect from "./statusSelect";
import { Session } from "next-auth";
import AddCommentButton from "./addCommentButton";

const IssueDetails = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="2" align="center">
        <StatusSelect issue={issue} disable={disable} />
        <p>{issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <Flex justify="center" my="2">
        <AddCommentButton issue={issue} disable={disable} />
      </Flex>
    </div>
  );
};

export default IssueDetails;
