import Pagination from "@/app/Pagination";
import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import prisma from "@/prisma/client";


export default async  function Home() {
  const open = await prisma.issue.count({ where: { status: 'OPEN'}})
  const in_progress = await prisma.issue.count({ where: { status: 'IN_PROGRESS'}})
  const closed = await prisma.issue.count({ where: { status: 'CLOSED'}})
  return (
      <IssueSummary open={open} in_progress={in_progress} closed={closed} />
  )
}
