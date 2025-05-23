import React from "react";
import { View, Text } from "react-native";
import { Order } from "@/modules/schema/Order";
import { formatDate } from "@/modules/shared/utils/date";
import { translateStatusOrder } from "@/modules/shared/utils/translate";

export const OrderDetails = ({ order }: { order: Order }) => {
    return (
        <>
            <Text className="text-xl font-bold mb-4">Resumo do Pedido</Text>

            <View className="mb-4">
                <Text className="text-xs text-zinc-600 mb-1">Status do pedido</Text>
                <Text className="bg-gray-100 rounded-xl px-4 py-2">
                    {translateStatusOrder(order.order_status)}
                </Text>
            </View>

            <View className="mb-4">
                <Text className="text-xs text-zinc-600 mb-1">Data do evento</Text>
                <Text className="bg-gray-100 rounded-xl px-4 py-2">
                    {formatDate(order.date.start)}  -  {formatDate(order.date.end)}
                </Text>
            </View>

            <View className="mb-4">
                <Text className="text-xs text-zinc-600 mb-1">Local do evento</Text>
                <Text className="bg-gray-100 rounded-xl px-4 py-2">
                    {order.location}
                </Text>
            </View>

            <View className="mb-4">
                <Text className="text-xs text-zinc-600 mb-1">Data do pedido</Text>
                <Text className="bg-gray-100 rounded-xl px-4 py-2">
                    {formatDate(order.created_at)}
                </Text>
            </View>

            <View className="mb-4">
                <Text className="text-xs text-zinc-600 mb-1">Número de convidados</Text>
                <Text className="bg-gray-100 rounded-xl px-4 py-2">
                    {order.guest_count}
                </Text>
            </View>

            {order.details &&
                <View className="mb-4">
                    <Text className="text-xs text-zinc-600 mb-1">Detalhes</Text>
                    <Text className="bg-gray-100 rounded-xl px-4 py-2">
                        {order.details}
                    </Text>
                </View>
            }
        </>
    )
};