import { editIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(request: NextRequest,
    {params}: {params: {id: string}}
){
const session = await getServerSession(authOptions)

    if(!session)
        return NextResponse.json({}, {status: 401});
    const body = await request.json();
    const validation = editIssueSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400});

    const {title, description, assignedToUserId, status} = body;

    if(assignedToUserId){
const user = await prisma.user.findUnique({
    where: {id: assignedToUserId}
    })
    if(!user) return NextResponse.json({error: "Invalid User"}, {status: 400}); 
    }

    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!issue) return NextResponse.json({error: "Invalid Issue"}, {status: 404});

    const updatedIssue = await prisma.issue.update({
        where: {id: parseInt(params.id)},
        data: {
            title,
            description,
            assignedToUserId,
            status
        }
    });

    return NextResponse.json(updatedIssue);
};

export async function DELETE(
    request: NextRequest,
    {params}: {params: {id: string}}
){
    const session = await getServerSession(authOptions)

    if(!session)
        return NextResponse.json({}, {status: 401});
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    if(!issue) return NextResponse.json({error: "Invalid Issue"}, {status: 404});

    await prisma.issue.delete({
        where: {id: issue.id}
    });

    return NextResponse.json({message: "Issue Deleted Successfully"});
};