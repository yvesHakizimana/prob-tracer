import IssueForm from "@/app/issues/_components/IssueForm";
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";

interface Props{
    params: { id: string };
}

const EditIssuePage = async ({ params: { id }}: Props) => {

    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id) } } )
    if(!foundIssue) notFound()

    return (
        <IssueForm issue={foundIssue}/>
    )
}

export default EditIssuePage;