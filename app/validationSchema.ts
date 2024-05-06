import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255, 'Title is too long!'),
    description: z.string().min(1,'Description is required!').max(65535, "Description is too long!"),
});

export const commentSchema = z.object({
    text: z.string().min(1, 'Comment is required!').max(65535, 'Comment is too long!'),
    issueId: z.number(),
    userId: z.string().max(255),
});


export const editIssueSchema = z.object({
    title: z.string().min(1, 'Title is required!').max(255, 'Title is too long!').optional(),
    description: z.string().min(1,'Description is required!').max(65535, "Description is too long!").optional(),
    assignedToUserId: z.string().min(1, 'Issue should be assigned!').max(255).optional().nullable(),
    status: z.string().optional(),
    comments: z.array(z.object({commentSchema})).optional().nullable()
});
