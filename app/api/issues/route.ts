import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {IssueSchema} from "@/app/validationSchemas";
import {getServerSession} from "next-auth";
import {AuthOptions} from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest){
    const session = await getServerSession(AuthOptions);
    if(!session)
        return NextResponse.json('Unauthorized', { status: 401})
    const body = await request.json();
    const validation = IssueSchema.safeParse(body);
    if(!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400});

    const newIssue = await prisma.issue.create({
        data: {
           title: body.title,
           description: body.description,
        }
    })

    return NextResponse.json(newIssue, { status: 201});
}