import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/app/issues/IssueFormSkeleton";

interface Props{
    params: { id: string };
}

const IssueForm = dynamic(
    () => import("@/app/issues/_components/IssueForm"),
    {
        ssr: false,
        loading: () => <IssueFormSkeleton />,
    }
)

const EditIssuePage = async ({ params: { id }}: Props) => {

    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id) } } )
    if(!foundIssue) notFound()

    return (
        <IssueForm issue={foundIssue}/>
    )
}

export default EditIssuePage;