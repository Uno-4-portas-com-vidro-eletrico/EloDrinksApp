import { api } from "@/libs/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            try {
                const response = await api.get(`/me`);
                return response.data;
            } catch (error: unknown) {
                console.error("Error fetching me:", error);
                throw error;
            }
        }
    });
}