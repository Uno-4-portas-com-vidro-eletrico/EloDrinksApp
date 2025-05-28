import { z } from "zod";

export const notificationSchema = z.object({
    customer_id: z.number(),
    title: z.string(),
    content: z.string(),
    page: z.string(),
    id: z.number(),
    is_read: z.boolean(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const notificationUpdateSchema = z.object({
    title: z.string(),
    content: z.string(),
    page: z.string(),
    is_read: z.boolean(),
});

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationUpdate = z.infer<typeof notificationUpdateSchema>;