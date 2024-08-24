import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Flex, Grid} from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    return (
        <Grid columns={{ initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={foundIssue} />
            </Box>
            <Box className='max-w-full'>
                <Flex direction='column' gap='4'>
                    <EditIssueButton issueId={foundIssue.id} />
                    <DeleteIssueButton issueId={foundIssue.id} />
                </Flex>
            </Box>

        </Grid>
    )
}

export  default  Page;