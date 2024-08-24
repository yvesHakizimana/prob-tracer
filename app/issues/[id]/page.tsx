import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon} from "@radix-ui/react-icons";
import Link from "next/link";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    return (
        <Grid columns={{ initial: '1', md: '2'}} gap='5'>
            <Box>
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
            </Box>
            <Box>
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${foundIssue.id}/edit`}>Edit Issue</Link>
                </Button>
            </Box>

        </Grid>
    )
}

export  default  Page;