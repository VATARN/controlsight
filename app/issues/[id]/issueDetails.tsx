import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";
import StatusSelect from "./statusSelect";
import { Session } from "next-auth";

const IssueDetails = ({
  issue,
  disable,
}: {
  issue: Issue;
  disable: Session | null;
}) => {
  return (
    <>
      <Text>Issue #{issue.id}</Text>
      <Heading>{issue.title}</Heading>
      <Flex gap="4" my="4" align="baseline">
        <StatusSelect issue={issue} disable={disable} />
        <div>
          <Text size="2" color="gray">
            Created on:
          </Text>{" "}
          <Text size="3">{issue.createdAt.toDateString()}</Text>
        </div>
        <div>
          <Text size="2" color="gray">
            Last Updated on:
          </Text>{" "}
          <Text size="3">{issue.updatedAt.toDateString()}</Text>
        </div>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <Text size="2" weight="bold">
          Issue Description:
        </Text>
        <ReactMarkdown className="m-2">{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
