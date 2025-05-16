import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { useProduct } from '../hooks/useProducts';
import { LoadingIndicator } from '@/modules/shared/components/commons/loading';
import { Product } from '@/modules/schema/Product';

interface ProductItemProps {
    productId: number;
    quantity: number;
    onLoad: (product: Product, quantity: number) => void;
}

export const ProductItem = ({ productId, quantity, onLoad }: ProductItemProps) => {
    const { data: product, isLoading } = useProduct(productId);

    useEffect(() => {
        if (product) {
            onLoad(product, quantity);
        }
    }, [product, quantity, onLoad]);

    if (isLoading) {
        return <LoadingIndicator />;
    }

    if (!product) {
        return (
            <View className="mb-2">
                <Text className="text-sm text-red-500">Produto não encontrado</Text>
            </View>
        );
    }

    // Só renderiza vazio, o render real acontece no modal agrupado
    return null;
};
