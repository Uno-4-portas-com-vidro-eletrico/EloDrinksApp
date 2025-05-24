import { api } from "@/libs/api";
import { Sales } from "@/modules/schema/Sales";
import { useQuery } from "@tanstack/react-query";

export function useSales(page: number, pageSize: number) {
    return useQuery<Sales[]>({
        queryKey: ["sales", page, pageSize],
        queryFn: async () => {
            try {
                const response = await api.get("/sales", {
                    params: {
                        page,
                        size: pageSize,
                    },
                });
                return response.data as Sales[];
            } catch (error: unknown) {
                console.error("Error fetching sales:", error);
                throw error;
            }
        }
    });
}