import React, { useEffect } from "react";
import { View, FlatList, TextInput, Text } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/shared/components/ui/tabs";
import { useOrdersInfinite } from "@/hooks/useOrders";
import { useUserStore } from "@/modules/auth/store/useUser";
import { Order, Orders } from "@/modules/schema/Order";
import { formatDate } from "@/modules/shared/utils/date";
import { Button } from "@/modules/shared/components/ui/button";
import { LoadingIndicator } from "@/modules/shared/components/commons/loading";


const renderItem = ({ item }: { item: Order }) => (
    <View className="w-full mb-4 bg-white p-4 rounded-xl shadow">
        <View className="mb-3">
            <Text className="text-xs text-zinc-600 mb-1">Data do evento</Text>
            <Text className="bg-gray-100 rounded-full min-w-full px-3 py-2">
                {formatDate(item.date.start)}
            </Text>
        </View>

        <View className="mb-3">
            <Text className="text-xs text-zinc-600 mb-1">Local do evento</Text>
            <Text className="bg-gray-100 rounded-full min-w-full px-3 py-2">
                {item.location}
            </Text>
        </View>

        <Button label="Detalhes" loadingText="Aguarde..." />
    </View>
);

const PageHistory = () => {
    const { user } = useUserStore();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useOrdersInfinite(user?.id ?? 0, 10);

    const allOrders: Orders = data?.pages.flat() ?? [];

    const filteredByTab = (tab: "pending" | "soon" | "past") => {
        const now = new Date();

        return allOrders.filter((order) => {
            if (tab === "pending") {
                return order.order_status === "pending";
            }

            if (order.order_status !== "confirmed") {
                return false;
            }

            const endDate = new Date(order.date.end);
            return tab === "soon" ? endDate >= now : endDate < now;
        });
    };

    return (
        <View className="bg-[#E0CEAA] h-screen">
            <View className="bg-[#F7F6F3] mx-6 my-6 rounded-3xl py-2 px-4 h-4/5">
                <Tabs defaultValue="soon">
                    <TabsList>
                        <TabsTrigger title="Pendentes" value="pending" />
                        <TabsTrigger title="Próximos" value="soon" />
                        <TabsTrigger title="Passados" value="past" />
                    </TabsList>

                    {["pending", "soon", "past"].map((status) => (
                        <TabsContent
                            key={status}
                            value={status}
                            className="flex flex-col items-center justify-start w-full"
                        >
                            {isLoading ? (
                                <View className="py-4">
                                    <LoadingIndicator />
                                </View>
                            ) : (
                                <>
                                    <FlatList
                                        data={filteredByTab(status as "pending" | "soon" | "past")}
                                        renderItem={renderItem}
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
                                            <Button
                                                label="Carregar mais"
                                                onPress={() => fetchNextPage()}
                                            />
                                        )
                                    )}
                                </>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>
            </View>
        </View>
    );
};

export default PageHistory;
