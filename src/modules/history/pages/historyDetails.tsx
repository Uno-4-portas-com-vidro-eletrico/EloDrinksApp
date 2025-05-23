import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useOrderById } from "@/hooks/useOrders";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { OrderDetails } from "../components/order-details";
import { BudgetDetails } from "../components/budget-details";
import { Accordion } from "@/modules/shared/components/commons/collapsible-section";

interface PageHistoryDetailsProps {
    id: string;
}

export const PageHistoryDetails = ({ id }: PageHistoryDetailsProps) => {
    const { data: order, isLoading } = useOrderById(id ?? "");

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
            </ScrollView>
        </View>
    );
};

export default PageHistoryDetails;
