import { api } from "@/libs/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export function useCreateOrder() {
    return useMutation({
        mutationFn: async (newOrder: any) => {
            try {
                const response = await api.post("/orders", newOrder);
                return response.data;
            } catch (error: unknown) {
                console.error("Error creating order:", error);
                throw error;
            }
        },
    });
}

export function useOrdersInfinite(userId: number, pageSize: number) {
    return useInfiniteQuery({
        queryKey: ["orders", userId, pageSize],
        initialPageParam: 1,
        enabled: !!userId,
        queryFn: async ({ pageParam }) => {
            const response = await api.get(`/orders/customer/${userId}`, {
                params: {
                    page: pageParam,
                    size: pageSize,
                },
            });
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < pageSize) return undefined;
            return allPages.length + 1;
        },
    });
}