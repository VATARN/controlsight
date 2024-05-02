import prisma from "@/prisma/client";
import Pagination from "./components/pagination";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const done = await prisma.issue.count({ where: { status: "DONE" } });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inprogress} done={done} />
        <IssueChart open={open} inProgress={inprogress} done={done} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Control Sight - Dashboard",
  description: "Check the summary of project issues",
};
