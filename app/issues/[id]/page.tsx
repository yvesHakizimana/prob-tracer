import {notFound} from "next/navigation";
import prisma from "@/prisma/client";
import {Box, Grid} from "@radix-ui/themes";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    return (
        <Grid columns={{ initial: '1', md: '2'}} gap='5'>
            <Box>
                <IssueDetails issue={foundIssue} />
            </Box>
            <Box>
                <EditIssueButton issueId={foundIssue.id} />
            </Box>

        </Grid>
    )
}

export  default  Page;