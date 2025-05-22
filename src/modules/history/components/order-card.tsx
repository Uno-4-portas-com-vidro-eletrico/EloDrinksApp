import React from "react";
import { View, Text } from "react-native";
import { Button } from "@/modules/shared/components/ui/button";
import { Order } from "@/modules/schema/Order";
import { formatDate } from "@/modules/shared/utils/date";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";

export const OrderCard = ({ order }: { order: Order }) => (
    <View className="w-full mb-4 bg-white p-4 rounded-xl shadow">
        <View className="mb-3">
            <Text className="text-xs text-zinc-600 mb-1">Data do evento</Text>
            <Text className="bg-gray-100 rounded-full min-w-full px-3 py-2">
                {formatDate(order.date.start)}
            </Text>
        </View>

        <View className="mb-3">
            <Text className="text-xs text-zinc-600 mb-1">Local do evento</Text>
            <Text className="bg-gray-100 rounded-full min-w-full px-3 py-2">
                {order.location}
            </Text>
        </View>

        <Button
            label="Detalhes"
            onPress={() => router.push(routersStrings.historyDetails(order._id))}
        />
    </View>
);