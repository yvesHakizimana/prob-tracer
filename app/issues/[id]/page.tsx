import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    return (
        <div>
            <Heading>{foundIssue.title}</Heading>
            <Flex gap='4'>
                <IssueStatusBadge status={foundIssue.status} />
                <Text>{foundIssue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                {foundIssue.description}
            </Card>
        </div>
    )
}

export  default  Page;