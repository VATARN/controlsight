import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueTools from "./issueTools";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const status = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 7;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3">
      <IssueTools />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="end">
        <Pagination
          itemCount={issueCount}
          pageSize={pageSize}
          currentPage={page}
        />
      </Flex>
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Control Sight - Issue List",
  description: "Check all project issues",
};
export default IssuesPage;
