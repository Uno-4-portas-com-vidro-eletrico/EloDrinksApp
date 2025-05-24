import { z } from "zod";

export const salesSchema = z.object({
    id: z.string(),
    name: z.string(),
    discount_percentage: z.number(),
    expire_date: z.date(),
    product_id: z.number(),
    pack_id: z.number(),
});

export type Sales = z.infer<typeof salesSchema>;