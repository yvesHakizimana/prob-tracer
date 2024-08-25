import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Flex, Grid} from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import {AuthOptions} from "@/app/api/auth/[...nextauth]/route";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const session = await getServerSession(AuthOptions)
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();


    return (
        <Grid columns={{ initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={foundIssue} />
            </Box>
            { session &&
            <Box className='max-w-full'>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect />
                    <EditIssueButton issueId={foundIssue.id} />
                    <DeleteIssueButton issueId={foundIssue.id} />
                </Flex>
            </Box>
            }
        </Grid>
    )
}

export  default  Page;