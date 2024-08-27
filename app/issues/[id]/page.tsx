import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Flex, Grid} from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import {getServerSession} from "next-auth";
import {AuthOptions} from "@/app/api/AuthOptions";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import {cache} from "react";

interface Props {
    params: { id: string };
}

const fetchUser = cache((issueId: number) =>  prisma.issue.findUnique({ where : { id: issueId } }));


const Page =  async ({params : { id }} : Props) => {
    const session = await getServerSession(AuthOptions)
    const foundIssue = await fetchUser(parseInt(id));
    if(!foundIssue) notFound();


    return (
        <Grid columns={{ initial: '1', sm: '5'}} gap='5'>
            <Box className='md:col-span-4'>
                <IssueDetails issue={foundIssue} />
            </Box>
            { session &&
            <Box className='max-w-full'>
                <Flex direction='column' gap='4'>
                    <AssigneeSelect issue={foundIssue}/>
                    <EditIssueButton issueId={foundIssue.id} />
                    <DeleteIssueButton issueId={foundIssue.id} />
                </Flex>
            </Box>
            }
        </Grid>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id));
    return {
        title: issue?.title,
        description: 'Details of the issue' + issue?.id
    }
}

export  default  Page;