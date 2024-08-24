import {notFound} from "next/navigation";
import prisma from "@/prisma/client";

interface Props {
    params: { id: string };
}

const Page =  async ({params : { id }} : Props) => {
    const foundIssue = await prisma.issue.findUnique({ where: { id : parseInt(id)}});
    if(!foundIssue) notFound();

    return (
        <div>
            <p>{foundIssue.title}</p>
            <p>{foundIssue.description}</p>
            <p>{foundIssue.status}</p>
            <p>{foundIssue.createdAt.toDateString()}</p>
        </div>
    )
}

export  default  Page;