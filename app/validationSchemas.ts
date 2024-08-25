import {z} from "zod";

export const IssueSchema = z.object({
    title: z.string().min(3, 'Title is required').max(255),
    description: z.string().min(5, 'Description is required.').max(255),
})

export const patchIssueSchema = z.object({
    title: z.string().min(3, 'Title is required').max(255).optional(),
    description: z.string().min(5, 'Description is required.').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'AssigneeUser Id is required').optional().nullish()
})