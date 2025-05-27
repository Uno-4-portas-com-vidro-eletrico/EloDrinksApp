import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
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

export function useStructureInfinite(pageSize: number) {
    return useInfiniteQuery({
        queryKey: ["structures"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const response = await api.get("/structure/", {
                params: {
                    page: pageParam,
                    size: pageSize,
                },
            });
            const structures = response.data as Structure[]
            return structures;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < pageSize) return undefined;
            return allPages.length + 1;
        },
    });
}