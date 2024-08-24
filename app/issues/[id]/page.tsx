import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import delay from "delay";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    await delay(2000)

    return (
        <div>
            <Heading>{foundIssue.title}</Heading>
            <Flex gap='4' my='4'>
                <IssueStatusBadge status={foundIssue.status} />
                <Text>{foundIssue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose' mt='4'>
                <ReactMarkdown>
                    {foundIssue.description}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export  default  Page;