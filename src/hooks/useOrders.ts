import { api } from "@/libs/api";
import { useMutation } from "@tanstack/react-query";

export function useCreateOrder() {
    return useMutation({
        mutationFn: async (newOrder: any) => {
            try {
                console.log(newOrder)
                // const response = await api.post("/orders", newOrder);
                // return response.data;
                return null;
            } catch (error: unknown) {
                console.error("Error creating order:", error);
                throw error;
            }
        },
    });
}