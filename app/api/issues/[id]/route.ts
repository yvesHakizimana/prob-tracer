import {NextRequest, NextResponse} from "next/server";
import {IssueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";

export async function PATCH(
    request: NextRequest,
    { params: {id}}: { params: { id: string } } ) {
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400});

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })
    if(!issue)
        return NextResponse.json('Invalid IssueId', { status: 404})

    const updatedIssue = await prisma.issue.update({
        where: {id: issue.id},
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, { status: 201});

}

export async function DELETE(
    request: NextRequest,
    { params: {id}}: { params: { id: string } } ){


    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(id)}
    })

    if(!issue)
        return NextResponse.json('Invalid IssueId', { status: 404})
    await prisma.issue.delete({
        where : { id: parseInt(id) }
    })
    return NextResponse.json('Successfully deleted issue', { status: 201});
}