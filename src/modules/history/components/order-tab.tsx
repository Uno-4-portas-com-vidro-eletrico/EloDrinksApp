import React from "react";
import { View, FlatList, Text, TextInput } from "react-native";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import { Button } from "@/modules/shared/components/ui/button";
import { Order } from "@/modules/schema/Order";
import { OrderCard } from "./order-card";

interface Props {
    orders: Order[];
    isLoading: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    onLoadMore: () => void;
}

export const OrdersTab = ({
    orders,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    onLoadMore,
}: Props) => {
    if (isLoading) {
        return (
            <View className="py-4">
                <LoadingIndicator />
            </View>
        );
    }

    return (
        <>
            <FlatList
                data={orders}
                renderItem={({ item }) => <OrderCard order={item} />}
                keyExtractor={(item) => item._id}
                style={{ height: '90%' }}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={
                    <View className="items-center justify-center py-10">
                        <TextInput
                            editable={false}
                            value="Não tem nada aqui"
                            className="text-xl text-gray-500 text-center bg-transparent"
                        />
                    </View>
                }
            />
            {hasNextPage && (
                isFetchingNextPage ? (
                    <LoadingIndicator />
                ) : (
                    <Button label="Carregar mais" onPress={onLoadMore} />
                )
            )}
        </>
    );
};