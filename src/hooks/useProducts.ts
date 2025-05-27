import { api } from "@/libs/api";
import { Product, ProductInCart } from "@/modules/schema/Product";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";


export function useProductsInfinite(pageSize: number) {
    return useInfiniteQuery({
        queryKey: ["products"],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => {
            const response = await api.get("/product/", {
                params: {
                    page: pageParam,
                    size: pageSize,
                    order: "category"
                },
            });
            const products = response.data as ProductInCart[]
            products.forEach(product => product.quantity = 0);
            return products;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < pageSize) return undefined;
            return allPages.length + 1;
        },
    });
}


export function useProduct(productId: number) {
    return useQuery<Product>({
        queryKey: ["product", productId],
        queryFn: async () => {
            try {
                const response = await api.get(`/product/${productId}`);
                return response.data as Product;
            } catch (error: unknown) {
                console.error("Error fetching product:", error);
                throw error;
            }
        }
    });
}

export function useSearchProducts(name: string) {
    return useQuery<ProductInCart[]>({
        queryKey: ["products-search", name],
        queryFn: async () => {
            try {
                const response = await api.get(`/product/search/?name=${name}`);
                const products = response.data as ProductInCart[]
                products.forEach(product => product.quantity = 0);
                return products;
            } catch (error: unknown) {
                console.error("Error fetching products:", error);
                throw error;
            }
        },
        enabled: !!name,
    });
}