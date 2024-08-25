import prisma from "@/prisma/client";
import IssueAction from "@/app/issues/IssueAction";
import {Status} from "@prisma/client";
import Pagination from "@/app/Pagination";
import IssueTable, {columnNames, IssueQuery} from "@/app/issues/IssueTable";

interface Props{
    searchParams: IssueQuery
}

const Page = async ({searchParams}: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const orderBy = columnNames.includes(searchParams.orderBy)? { [searchParams.orderBy] : 'asc'} : undefined;
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 6;
    const issues = await prisma.issue.findMany({
        where: {
            status
        },
        orderBy,
        skip: (page - 1 ) *  pageSize,
        take: pageSize
    })

    const itemCount = await prisma.issue.count({ where: { status}});
    return (
        <div>
            <IssueAction />
            <IssueTable issues={issues} searchParams={searchParams} />
            <Pagination itemsCount={itemCount} currentPage={page} pageSize={pageSize} />
        </div>
    )
}

export const revalidate = 0;

export default Page;