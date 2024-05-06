import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { commentSchema } from "@/app/validationSchema";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export const GET = async (request: NextRequest,{params}: {params: {id: string}}) => {
 const comments = await prisma.comment.findMany({
      where: { issueId: parseInt(params.id)
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
};



export const POST = async (request: NextRequest) => {
    const session = await getServerSession(authOptions)
    if(!session)
        return NextResponse.json({}, {status: 401});
    
const body = await request.json();
const validation = commentSchema.safeParse(body);
if(!validation.success){
    return NextResponse.json(validation.error.errors, {status: 400});
}
const { text, issueId, userId } = body;

const newComment = await prisma.comment.create({
    data: {
    text, issueId, userId
}});

return NextResponse.json(newComment, {status: 201});
};