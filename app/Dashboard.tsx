import { Skeleton } from "@/app/components";
import { Flex, Grid } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";

const IssueSummary = dynamic(() => import("@/app/IssueSummary"), {
  ssr: false,
  loading: () => <Skeleton height="5rem" />,
});
const LatestIssues = dynamic(() => import("@/app/LatestIssues"), {
  ssr: false,
  loading: () => <Skeleton height="25rem" />,
});
const IssueChart = dynamic(() => import("@/app/IssueChart"), {
  ssr: false,
  loading: () => <Skeleton height="18rem" />,
});

export default async function Dashboard() {
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
