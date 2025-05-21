import { useQuery } from "@tanstack/react-query";
import { api } from "@/libs/api";
import { Structure } from "@/modules/schema/Structure";

export function useStructure(id?: number) {
    return useQuery<Structure>({
        queryKey: ["structure", id],
        queryFn: async () => {
            try {
                const response = await api.get(`/structure/${id}`);
                return response.data as Structure;
            } catch (error: unknown) {
                console.error("Error fetching structure:", error);
                throw error;
            }
        },
        enabled: !!id,
    });
}