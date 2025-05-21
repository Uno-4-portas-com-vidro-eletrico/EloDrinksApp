import { api } from "@/libs/api";
import { Product } from "@/modules/schema/Product";
import { useQuery } from "@tanstack/react-query";

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