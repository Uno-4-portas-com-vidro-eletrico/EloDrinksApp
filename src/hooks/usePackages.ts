import { api } from "@/libs/api";
import { Package } from "@/modules/schema/Package";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

export function usePackage(id?: number) {
    return useQuery<Package>({
        enabled: !!id,
        queryKey: ["package", id],
        queryFn: async () => {
            try {
                const response = await api.get(`/packs/${id}`);
                return response.data as Package;
            } catch (error: unknown) {
                console.error("Error fetching package:", error);
                throw error;
            }
        }
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
