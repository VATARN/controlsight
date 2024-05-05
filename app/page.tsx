import prisma from "@/prisma/client";
import { Skeleton } from "@/app/components";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getDatabase } from "./utlities";

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

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const open = (await getDatabase()).open;
  const inprogress = (await getDatabase()).inprogress;
  const done = (await getDatabase()).done;

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
