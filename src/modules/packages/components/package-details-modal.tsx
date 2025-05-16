import React, { useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View, ScrollView, Image } from 'react-native';
import { Package } from '../../schema/Package';
import { useStructure } from '../hooks/useStructure';
import { LoadingIndicator } from '@/modules/shared/components/commons/loading';
import { ProductItem } from './package-details-product-item';
import { Product } from '@/modules/schema/Product';
import { usePackage } from '../hooks/usePackages';
import { HorizontalScroll } from '@/modules/shared/components/commons/horizontal-scroll';

interface PackageDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    pack: Package;
}

type ProductWithQuantity = Product & { quantity: number };

export const PackageDetailsModal = ({ visible, onClose, pack }: PackageDetailsModalProps) => {
    const { data: structureData, isLoading: isLoadingStructure } = useStructure(pack.structure_id);
    const { data: packageData, isLoading: isLoadingPackage } = usePackage(pack.id);
    const [groupedProducts, setGroupedProducts] = useState<{ [category: string]: ProductWithQuantity[] }>({});
    const addedProductsRef = useRef<Set<number>>(new Set());

    const handleProductLoaded = (product: Product, quantity: number) => {
        if (addedProductsRef.current.has(product.id)) {
            return;
        }

        addedProductsRef.current.add(product.id);

        setGroupedProducts(prev => {
            const category = product.category;
            const updatedCategory = prev[category]
                ? [...prev[category], { ...product, quantity }]
                : [{ ...product, quantity }];
            return { ...prev, [category]: updatedCategory };
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View
                className="flex-1 justify-center items-center"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
            >
                <View className="bg-white px-6 py-8 rounded-2xl w-11/12 max-w-md max-h-[80%]">
                    <ScrollView>
                        <Text className="text-lg font-bold text-[#F7F6F3] mb-4 bg-[#5A5040] py-1 px-1 text-center">{pack.name}</Text>

                        <Text className="text-sm text-zinc-700 mb-1">Tipo de evento: {pack.event_type}</Text>
                        <Text className="text-sm text-zinc-700 mb-1">Convidados: {pack.guest_count}</Text>
                        <Text className="text-base font-bold text-[#101820] mb-4">
                            Preço R$ {pack.price.toFixed(2)}
                        </Text>

                        {isLoadingStructure ? (
                            <LoadingIndicator />
                        ) : (
                            <View className='mb-6 mt-6'>
                                <Text className="text-lg font-bold text-[#5A5040] mb-4 bg-[#F7F6F3] py-1 px-1 text-center">Estrutura do pacote</Text>
                                <Text className="text-sm text-zinc-600">Estrutura: {structureData?.name}</Text>
                                <Text className="text-sm font-bold text-[#101820] mb-4">
                                    Preço R$ {structureData?.price.toFixed(2)}
                                </Text>
                            </View>
                        )}

                        {isLoadingPackage ? (
                            <LoadingIndicator />
                        ) : (
                            <>
                                {packageData && packageData.products.length > 0 && (
                                    <View className="mt-4">
                                        <Text className="text-lg font-bold text-[#5A5040] bg-[#F7F6F3] py-1 px-1 text-center">Produtos</Text>
                                        {packageData.products.map(({ id, quantity }) => (
                                            <ProductItem
                                                key={id}
                                                productId={id}
                                                quantity={quantity}
                                                onLoad={handleProductLoaded}
                                            />
                                        ))}

                                        {Object.entries(groupedProducts).map(([category, products]) => (
                                            <View key={category} className="mt-6">
                                                <Text className="text-md font-bold text-[#101820] mb-2">{category}</Text>
                                                <HorizontalScroll>
                                                    {products.map(product => (
                                                        <View
                                                            key={product.id}
                                                            className="bg-zinc-100 rounded-xl p-3 mr-3"
                                                            style={{ width: 140, height: 160 }} // card menor e proporcional
                                                        >
                                                            <Image
                                                                source={{ uri: product.img_url }}
                                                                className="w-full h-20 rounded-lg mb-2"
                                                                resizeMode="cover"
                                                            />
                                                            <Text className="text-sm font-semibold text-[#101820]">{product.name}</Text>
                                                            <Text className="text-xs text-zinc-600">Qtd: {product.quantity}</Text>
                                                            <Text className="text-xs text-zinc-600">
                                                                R$ {(product.price * product.quantity).toFixed(2)}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </HorizontalScroll>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </>
                        )}

                    </ScrollView>
                    <TouchableOpacity
                        className="fixed mt-4 -mb-4 px-4 py-3 bg-[#9D4815] rounded-xl"
                        onPress={onClose}
                    >
                        <Text className="text-white font-bold text-center">Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
