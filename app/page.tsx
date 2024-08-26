import Pagination from "@/app/Pagination";
import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";
import IssuesChart from "@/app/IssuesChart";
import {Flex, Grid} from "@radix-ui/themes";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Problem-Tracer - Dashboard',
    description: 'View a summary of the bugs/issues in the project'
}


export default async  function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN'}})
  const in_progress = await prisma.issue.count({ where: { status: 'IN_PROGRESS'}})
  const closed = await prisma.issue.count({ where: { status: 'CLOSED'}})
  return (
      <Grid columns={{ initial: '1', md : '2'}} gap='4'>
        <Flex direction='column' gap='4'>
          <IssueSummary open={open} in_progress={in_progress} closed={closed} />
          <IssuesChart open={open} in_progress={in_progress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
  )
}
