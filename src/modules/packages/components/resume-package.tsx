import React, { useRef, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useStructure } from "../hooks/useStructure";
import { usePackage } from "../hooks/usePackages";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { ProductItem } from "./package-details-product-item";
import { Product } from "@/modules/schema/Product";
import { HorizontalScroll } from "@/modules/shared/components/commons/horizontal-scroll";

type ResumePackageProps = {
    packData: any
    structureData: any
    packageData: any
};

type ProductWithQuantity = Product & { quantity: number };

export const ResumePackage = ({ packData, structureData, packageData }: ResumePackageProps) => {
    const pack = packData
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
        <View className="bg-white p-4 rounded-xl shadow-md">
            <Text className="text-xl font-bold text-[#101820] bg-[#E0CEAA] py-1 px-2">Resumo do Pacote Escolhido</Text>
            <View className="bg-white px-2 w-full border-x-0 border-l border-r border-b pt-2 pb-8 border-[#E0CEAA]">
                <Text className="text-sm font-bold text-[#F7F6F3] mb-1 bg-[#5A5040] py-1 px-1 text-center">{pack.name}</Text>
                <Text className="text-sm text-zinc-700 mb-1">Tipo de evento: {pack.event_type}</Text>
                <Text className="text-sm text-zinc-700 mb-1">Convidados: {pack.guest_count}</Text>
                <Text className="text-base font-bold text-[#101820] mb-4">
                    Preço: R$ {pack.price.toFixed(2)}
                </Text>

                <View>
                    <Text className="text-sm font-bold text-[#5A5040] mt-2 mb-2 bg-[#F7F6F3] py-1 px-1 text-center">Estrutura do pacote</Text>
                    <Text className="text-sm text-zinc-600">Estrutura: {structureData?.name}</Text>
                    <Text className="text-sm font-bold text-[#101820] mb-4">
                        Preço R$ {structureData?.price.toFixed(2)}
                    </Text>
                </View>

                {packageData && packageData.products.length > 0 && (
                    <View className="mt-4">
                        <Text className="text-sm font-bold text-[#5A5040] mt-2 bg-[#F7F6F3] py-1 px-1 text-center">Produtos</Text>
                        {packageData.products.map(({ id, quantity }: { id: number; quantity: number }) => (
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

            </View>
        </View>
    );
};