import { api } from "@/libs/api";
import { useTokenStore } from "@/modules/auth/store/useTokenStore";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Package } from "../schema/Package";

export function usePackagesInfinite(pageSize: number) {
    return useInfiniteQuery({
        queryKey: ["packages"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const response = await api.get("/packs", {
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

export function useSearchPackages(name: string) {
    return useQuery<Package[]>({
        queryKey: ["packages-search", name],
        queryFn: async () => {
            try {
                const response = await api.get(`/packs/search/?name=${name}`);
                return response.data as Package[];
            } catch (error: unknown) {
                console.error("Error fetching packages:", error);
                throw error;
            }
        },
        enabled: !!name,
    });
}
