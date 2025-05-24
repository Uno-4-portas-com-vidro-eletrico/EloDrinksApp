import { api } from "@/libs/api";
import { Order } from "@/modules/schema/Order";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export function useOrderById(orderId: string) {
    return useQuery<Order>({
        queryKey: ["order", orderId],
        queryFn: async () => {
            try {
                const response = await api.get(`/orders/${orderId}`);
                return response.data as Order;
            } catch (error: unknown) {
                console.error("Error fetching order:", error);
                throw error;
            }
        }
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation<void, unknown, string>({
        mutationFn: async (newOrderId: string) => {
            try {
                await api.patch(`/orders/${newOrderId}/cancel`);
            } catch (error: unknown) {
                console.error("Error deleting order:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order"] });
        }
    });
}