import { api } from "@/libs/api";
import { NotificationUpdate } from "@/modules/schema/Notification";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

export function useNotificationsInfinite(userId: number, pageSize: number) {
    return useInfiniteQuery({
        queryKey: ["notifications", userId, pageSize],
        initialPageParam: 1,
        enabled: !!userId,
        queryFn: async ({ pageParam }) => {
            const response = await api.get(`/notifications/customer/${userId}`, {
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

export function useReadNotification() {
    return useMutation<void, unknown, { notification: NotificationUpdate; notificationId: number }>({
        mutationFn: async ({ notification, notificationId }) => {
            try {
                await api.patch(`/notifications/${notificationId}`, notification);
            } catch (error: unknown) {
                console.error("Error confirm order:", error);
                throw error;
            }
        }
    });
}