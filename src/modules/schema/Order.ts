import { z } from "zod";

export const CustomerSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    phone: z.number(),
});

export const DateRangeSchema = z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
});

export const BarStructureSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
});

export const BudgetItemSchema = z.object({
    id: z.number(),
    name: z.string(),
    quantity: z.number(),
    unit_price: z.number(),
    img_url: z.string(),
    category: z.string(),
});

export const BudgetSchema = z.object({
    total_value: z.number(),
    bar_structure: BarStructureSchema,
    items: z.array(BudgetItemSchema),
});

export const OrderSchema = z.object({
    customer: CustomerSchema,
    date: DateRangeSchema,
    guest_count: z.number(),
    location: z.string(),
    order_status: z.string(),
    budget: BudgetSchema,
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    details: z.string().optional(),
    _id: z.string(),
});

export const OrdersSchema = z.array(OrderSchema);

export type Customer = z.infer<typeof CustomerSchema>;
export type DateRange = z.infer<typeof DateRangeSchema>;
export type BarStructure = z.infer<typeof BarStructureSchema>;
export type BudgetItem = z.infer<typeof BudgetItemSchema>;
export type Budget = z.infer<typeof BudgetSchema>;
export type Order = z.infer<typeof OrderSchema>;
export type Orders = z.infer<typeof OrdersSchema>;