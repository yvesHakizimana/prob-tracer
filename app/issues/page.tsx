import {Table} from "@radix-ui/themes"
import prisma from "@/prisma/client";
import {IssueStatusBadge, Link} from "@/app/components";
import IssueAction from "@/app/issues/IssueAction";
import {Issue, Status} from "@prisma/client";
import NextLink from "next/link"
import {ArrowUpIcon} from "@radix-ui/react-icons";

interface Props{
    searchParams: { status :  Status, orderBy: keyof Issue}
}


const columns : {
    label: string,
    value: keyof Issue,
    classname?: string
}[] = [
    {label: 'Issue', value: "title"},
    {label: 'Status', value: "status", classname: "hidden md:table-cell"},
    {label: 'Created', value: "createdAt", classname: "hidden md:table-cell"}
]

const Page = async ({searchParams}: Props) => {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
    const orderBy = columns.map(c => c.value).includes(searchParams.orderBy)? { [searchParams.orderBy] : 'asc'} : undefined;
    const issues = await prisma.issue.findMany({
        where: {
            status
        },
        orderBy
    })
    return (
        <div>
            <IssueAction />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map(column =>
                            <Table.ColumnHeaderCell key={column.value} className={column.classname}>
                                <NextLink href={{query: {...searchParams, orderBy: column.value}}}>{column.label}</NextLink>
                                {column.value === searchParams.orderBy && <ArrowUpIcon  className='inline'/> }
                            </Table.ColumnHeaderCell>
                        )}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.RowHeaderCell>
                                <Link href={`/issues/${issue.id}`}>
                                    {issue.title}
                                </Link>
                                <div className='block md:hidden'>
                                    <IssueStatusBadge status={issue.status} />
                                </div>
                            </Table.RowHeaderCell>

                            <Table.Cell className='hidden md:table-cell'>
                                <IssueStatusBadge status={issue.status} />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table.Root>
        </div>
    )
}

export const revalidate = 0;

export default Page;