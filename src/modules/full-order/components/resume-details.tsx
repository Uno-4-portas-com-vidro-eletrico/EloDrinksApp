import { Product, ProductInCart } from "@/modules/schema/Product";
import { HorizontalScroll } from "@/modules/shared/components/commons/horizontal-scroll";
import { formatDate } from "@/modules/shared/utils/date";
import React, { useRef, useState } from "react";
import { View, Text, Image } from "react-native";
import { ProductItem } from "./resume-details-product-item";

type EventData = {
    eventName: string;
    startDate: string;
    endDate: string;
    duration: string;
    guestCount: string;
    location: string;
    details: string;
}

type ResumeDetailsProps = {
    eventData: any
    structureData: any
    cartData: any
};

export const ResumeDetails = ({ eventData, structureData, cartData }: ResumeDetailsProps) => {
    const [groupedProducts, setGroupedProducts] = useState<{ [category: string]: ProductInCart[] }>({});

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
            <Text className="text-xl font-bold text-[#101820] bg-[#E0CEAA] py-1 px-2">
                Resumo do Evento e Observações
            </Text>
            <View className="pl-2 border-x-0 border-l border-r border-b pt-2 pb-4 border-[#E0CEAA]">
                <Text className="text-sm text-gray-800 mb-1 font-semibold">
                    Nome do Evento: <Text className="font-regular">{eventData.eventName}</Text>
                </Text>
                <Text className="text-sm text-gray-800 mb-1 font-semibold">
                    Inicio: <Text className="font-regular">{formatDate(eventData.startDate)}</Text>
                </Text>
                <Text className="text-sm text-gray-800 mb-1 font-semibold">
                    Fim: <Text className="font-regular">{formatDate(eventData.endDate)}</Text>
                </Text>
                <Text className="text-sm text-gray-800 mb-1 font-semibold">
                    Local: <Text className="font-regular">{eventData.location}</Text>
                </Text>
                <Text className="text-sm text-gray-800 font-semibold">
                    Convidados: <Text className="font-regular">{eventData.guestCount}</Text>
                </Text>
                <Text className="text-sm text-gray-800 font-semibold">
                    Tipo de Evento: <Text className="font-regular">{eventData.event_type}</Text>
                </Text>
                <View>
                    <Text className="text-sm font-bold text-[#5A5040] mt-2 mb-2 bg-[#F7F6F3] py-1 px-1 text-center">Estrutura do pacote</Text>
                    <Text className="text-sm text-zinc-600">Estrutura: {structureData.name}</Text>
                    <Text className="text-sm font-bold text-[#101820] mb-4">
                        Preço R$ {structureData.price.toFixed(2)}
                    </Text>
                </View>
                {cartData && cartData.products.length > 0 && (
                    <View className="mt-4">
                        <Text className="text-sm font-bold text-[#5A5040] mt-2 bg-[#F7F6F3] py-1 px-1 text-center">Produtos</Text>
                        {cartData.products.map(({ id, quantity }: { id: number; quantity: number }) => (
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
                                            style={{ width: 140, height: 160 }}
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