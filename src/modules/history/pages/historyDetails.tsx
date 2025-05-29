import React, { useCallback, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDeleteOrder, useOrderById } from "@/hooks/useOrders";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { OrderDetails } from "../components/order-details";
import { BudgetDetails } from "../components/budget-details";
import { Accordion } from "@/modules/shared/components/commons/collapsible-section";
import { shareOrderAsPDF } from "@/modules/shared/utils/exportOrderToPdf";
import { Button } from "@/modules/shared/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "@/modules/shared/components/ui/alert-dialog";
import useToast from "@/modules/shared/hooks/useToast";
import { router, useFocusEffect } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";

interface PageHistoryDetailsProps {
    id: string;
}

export const PageHistoryDetails = ({ id }: PageHistoryDetailsProps) => {
    const showToast = useToast();
    const { data: order, isLoading, refetch } = useOrderById(id ?? "");
    const { mutate: mutateDelete, isSuccess: isSuccessDelete, isError: isErrorDelete } = useDeleteOrder();

    useFocusEffect(
        useCallback(() => {
            if (id) {
                refetch();
            }
        }, [id, refetch])
    );

    useEffect(() => {
        if (isSuccessDelete) {
            showToast("success", "Pedido atualizado com sucesso!");
            router.push(routersStrings.history);
        }
        if (isErrorDelete) {
            showToast("danger", "Ocorreu um erro ao atualizar o pedido.");
        }
    }, [isSuccessDelete, isErrorDelete]);

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <LoadingIndicator />
            </View>
        );
    }

    if (!order) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-lg text-zinc-500">Pedido não encontrado.</Text>
            </View>
        );
    }

    return (
        <View className="bg-[#E0CEAA] h-full">
            <ScrollView className="bg-[#F7F6F3] mx-6 my-6 rounded-3xl py-4 px-4">
                {order.order_status === "pending" && (
                    <View className="flex flex-row w-full items-center mb-3">
                        <View className="w-3/5 mr-2">
                            <Text className="text-lg text-red-500 font-bold">Aguarde</Text>
                            <Text className="text-sm text-gray-600">Este pedido está aguardando nossa aprovação.</Text>
                        </View>
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button
                                    className="w-2/5"
                                    label="Cancelar"
                                />
                            </AlertDialogTrigger>
                            <AlertDialogContent onConfirm={() => mutateDelete(order._id)} >
                                <AlertDialogTitle>Confirmar cancelamento</AlertDialogTitle>
                                <AlertDialogText>{"Atenção!!!\nVocê estará excluindo esse pedido de orçamento!"}</AlertDialogText>
                            </AlertDialogContent>
                        </AlertDialog>
                    </View>
                )}
                <Accordion
                    sections={[
                        {
                            title: "Detalhes do Pedido",
                            content: <OrderDetails order={order} />
                        },
                        {
                            title: "Detalhes do Orçamento",
                            content: <BudgetDetails budget={order.budget} />
                        }
                    ]}
                />
                <View className="mt-1 mb-8">
                    <TouchableOpacity onPress={() => shareOrderAsPDF(order)} className="bg-white border border-[#8D4A24] px-4 py-2 rounded-lg">
                        <Text className="text-[#8D4A24] font-bold text-center">Exportar Orçamento</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default PageHistoryDetails;
