import { Stepper } from "@/modules/shared/components/commons/stepper";
import { Alert, ScrollView, View } from "react-native";
import { ResumeDetails } from "../components/resume-details";
import { usePackStore } from "../store/useOrderStore";
import { ResumePackage } from "../components/resume-package";
import { Button } from "@/modules/shared/components/ui/button";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useCreateOrder } from "../hooks/useOrders";
import { useStructure } from "../hooks/useStructure";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { usePackage } from "../hooks/usePackages";
import React, { useEffect, useState } from "react";
import { Product } from "@/modules/schema/Product";
import { useProduct } from "../hooks/useProducts";

const PageNewOrderResume = () => {
    const [detailedItems, setDetailedItems] = useState<Array<Product & { quantity: number }>>([]);
    const [loadedCount, setLoadedCount] = React.useState(0);
    const { eventData, pack } = usePackStore();
    const { mutate, isSuccess, isError, isPending } = useCreateOrder();
    const {
        data: structureData,
        isLoading: isLoadingStructure,
    } = pack ? useStructure(pack.structure_id) : { data: null, isLoading: false };
    const {
        data: packageData,
        isLoading: isLoadingPackage,
    } = pack ? usePackage(pack.id) : { data: null, isLoading: false };


    const handleProductLoaded = (product: Product, quantity: number) => {
        setDetailedItems(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, { ...product, quantity }];
        });
        setLoadedCount(count => count + 1);
    };

    const handleConfirm = () => {
        if (!packageData) {
            Alert.alert("Erro", "Pacote não encontrado.");
            return;
        }
        if (loadedCount < packageData.products.length) {
            Alert.alert("Aguarde", "Os produtos ainda estão carregando.");
            return;
        }

        Alert.alert(
            "Confirmar Pedido",
            "Você confirma o envio do seu pedido?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Confirmar",
                    onPress: () => {
                        mutate({
                            "customer": {
                                "id": 0,
                                "name": "string",
                                "email": "string",
                                "phone": 0
                            },
                            "date": {
                                "start": eventData?.startDate,
                                "end": eventData?.endDate
                            },
                            "guest_count": pack?.guest_count,
                            "location": eventData?.location,
                            "order_status": "pending",
                            "budget": {
                                "total_value": pack?.price,
                                "bar_structure": {
                                    "id": structureData?.id,
                                    "name": structureData?.name,
                                    "price": structureData?.price
                                },
                                items: detailedItems.map(({ id, name, quantity, price, img_url, category }) => ({
                                    id,
                                    name,
                                    quantity,
                                    unit_price: price,
                                    img_url,
                                    category,
                                })),
                            }
                        })
                    },
                },
            ]
        );
    };

    return (
        <View className="bg-white rounded-3xl px-2 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={3} totalSteps={3} />
            <ScrollView className="h-4/6">
                <ResumeDetails eventData={eventData} />

                {isLoadingStructure || isLoadingPackage ? (
                    <LoadingIndicator />
                ) : (
                    <ResumePackage packData={pack} structureData={structureData} packageData={packageData} />
                )}

            </ScrollView>
            <View className="space-y-4 my-4">
                <Button
                    className="bg-[#5A5040]"
                    label="Cancelar"
                    onPress={() => {
                        Alert.alert(
                            "Confirmar",
                            "Atenção!!!\nVocê voltará ao inicio do seu orçamento!",
                            [
                                { text: "Cancelar", style: "cancel" },
                                {
                                    text: "Sim",
                                    onPress: () =>
                                        router.push(routersStrings.newOrder_packages),
                                },
                            ]
                        );
                    }}
                />
                <Button label="Confirmar" onPress={handleConfirm} />
            </View>
            {packageData && packageData.products && packageData.products.length > 0 && packageData.products.map(({ id, quantity }) => (
                <ProductLoader
                    key={id}
                    productId={id}
                    quantity={quantity}
                    onLoad={handleProductLoaded}
                />
            ))}
        </View>
    );
};

const ProductLoader: React.FC<{
    productId: number;
    quantity: number;
    onLoad: (product: Product, quantity: number) => void;
}> = ({ productId, quantity, onLoad }) => {
    const { data: product, isLoading } = useProduct(productId);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (product && !loaded) {
            onLoad(product, quantity);
            setLoaded(true);
        }
    }, [product, quantity, onLoad, loaded]);

    return null;
};

export default PageNewOrderResume;
