import { ScrollView, Text, View } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import { useFullOrderStore } from "../store/useFullorderStore";
import { ResumeDetails } from "../components/resume-details";
import { useUserStore } from "@/modules/auth/store/useUser";
import { Product } from "@/modules/schema/Product";
import { useProduct } from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";
import useToast from "@/modules/shared/hooks/useToast";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useCreateOrder } from "@/hooks/useOrders";
import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "@/modules/shared/components/ui/alert-dialog";
import { Button } from "@/modules/shared/components/ui/button";
import { formatToISOStringWithOffset } from "@/modules/shared/utils/date";


const PageNewOrderInitial = () => {
    const showToast = useToast();
    const { cart, eventData, structure, clearCart, clearEventData, clearStructure } = useFullOrderStore();
    const [detailedItems, setDetailedItems] = useState<Array<Product & { quantity: number }>>([]);
    const { mutate, isSuccess, isError, isPending } = useCreateOrder();
    const [loadedCount, setLoadedCount] = React.useState(0);
    const { user } = useUserStore();

    const handleProductLoaded = (product: Product, quantity: number) => {
        setDetailedItems(prev => {
            if (prev.some(item => item.id === product.id)) return prev;
            return [...prev, { ...product, quantity }];
        });
        setLoadedCount(count => count + 1);
    };

    useEffect(() => {
        if (isSuccess) {
            showToast("success", "Pacote criado com sucesso!");
            setTimeout(() => {
                clearCart();
                clearEventData();
                clearStructure();
            }, 100);
            router.push(routersStrings.home);
        }
        if (isError) {
            showToast("danger", "Ocorreu um erro ao criar o pacote.");
        }
    }, [isSuccess, isError]);

    return (
        <View className="bg-white rounded-3xl px-2 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={4} totalSteps={4} />
            <ScrollView className="h-4/6">
                {eventData && <ResumeDetails eventData={eventData} structureData={structure} cartData={cart} />}
            </ScrollView>
            <View className="space-y-4 my-4">
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button
                            className="bg-[#5A5040] mx-4"
                            label="Cancelar"
                        />
                    </AlertDialogTrigger>
                    <AlertDialogContent onConfirm={() => {
                        clearCart();
                        clearEventData();
                        clearStructure();
                        router.push(routersStrings.newOrder_fullorder)
                    }} >
                        <AlertDialogTitle>Confirmar</AlertDialogTitle>
                        <AlertDialogText>{"Atenção!!!\nVocê voltará ao inicio do seu orçamento!"}</AlertDialogText>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Package Error Dialog */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <View style={{ display: 'none' }} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle>Erro</AlertDialogTitle>
                        <AlertDialogText>Pacote não encontrado.</AlertDialogText>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Loading Dialog */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <View style={{ display: 'none' }} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle>Aguarde</AlertDialogTitle>
                        <AlertDialogText>Os produtos ainda estão carregando.</AlertDialogText>
                    </AlertDialogContent>
                </AlertDialog>

                {/* Confirm Order Dialog */}
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button label="Confirmar" className="mt-2 mx-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent onConfirm={() => {
                        mutate({
                            "customer": {
                                "id": user?.id,
                                "name": user?.name,
                                "email": user?.email,
                                "phone": parseInt((user?.telephone ?? "").replace(/\D/g, ""), 10)
                            },
                            "date": {
                                "start": formatToISOStringWithOffset(eventData?.startDate),
                                "end": formatToISOStringWithOffset(eventData?.endDate)
                            },
                            "guest_count": eventData?.guestCount,
                            "location": eventData?.location,
                            "order_status": "pending",
                            "budget": {
                                "total_value": structure?.price ? cart.total + structure?.price : cart.total,
                                "bar_structure": {
                                    "id": structure?.id,
                                    "name": structure?.name,
                                    "price": structure?.price
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
                        });
                    }}>
                        <AlertDialogTitle>Confirmar Pedido</AlertDialogTitle>
                        <AlertDialogText>Você confirma o envio do seu pedido?</AlertDialogText>
                    </AlertDialogContent>
                </AlertDialog>
            </View>
            {cart && cart.products && cart.products.length > 0 && cart.products.map(({ id, quantity }: { id: number; quantity: number }) => (
                <ProductLoader
                    key={id}
                    productId={id}
                    quantity={quantity}
                    onLoad={handleProductLoaded}
                />
            ))}
        </View>
    );
}

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

export default PageNewOrderInitial;