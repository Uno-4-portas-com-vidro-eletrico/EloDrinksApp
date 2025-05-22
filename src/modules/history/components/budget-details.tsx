import React from "react";
import { View, Text } from "react-native";
import { Budget, } from "@/modules/schema/Order";
import { OrderItems } from "./order-itens";

export const BudgetDetails = ({ budget }: { budget: Budget }) => (
    <>
        <Text className="text-xl font-bold mb-4">Detalhes do Pedido</Text>

        <View className="mb-4">
            <Text className="text-xs text-zinc-600 mb-1">Valor total do pedido</Text>
            <Text className="bg-gray-100 rounded-xl px-4 py-2">
                {budget.total_value}
            </Text>
        </View>

        <View className="mb-4">
            <Text className="text-xs text-zinc-600 mb-1">Estrutura do bar</Text>
            <Text className="bg-gray-100 rounded-xl px-4 py-2">
                {budget.bar_structure.name}
            </Text>
        </View>

        <View className="mb-4">
            <Text className="text-xs text-zinc-600 mb-1">Preço da estrutura do bar</Text>
            <Text className="bg-gray-100 rounded-xl px-4 py-2">
                {budget.bar_structure.price}
            </Text>
        </View>

        {budget.items && budget.items.length > 0 &&
            <OrderItems items={budget.items} />
        }
    </>
);