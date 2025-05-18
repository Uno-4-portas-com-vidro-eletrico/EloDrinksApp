import React from "react";
import { View, FlatList, TextInput, Switch, Button } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/shared/components/ui/tabs";
import { useOrdersInfinite } from "@/hooks/useOrders";

type EventItem = {
    id: string;
    date: string;
    eventType: string;
    selected: boolean;
    order_status: "cancelled" | "confirmed" | "pending";
};

const renderItem = ({ item }: { item: EventItem }) => (
    <View className="flex-row items-center space-x-2 mb-3 px-2">
        <Switch value={item.selected} />
        <TextInput
            placeholder="dd/mm/aaaa"
            className="bg-white rounded-full px-3 py-2 w-32 shadow"
            value={item.date}
            editable={false}
        />
        <TextInput
            placeholder="Tipo de evento"
            className="bg-white rounded-full px-3 py-2 w-40 shadow"
            value={item.eventType}
            editable={false}
        />
    </View>
);

const PageHistory = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useOrdersInfinite(101, 10);

    const allOrders: EventItem[] = data?.pages.flat() ?? [];

    const filteredByStatus = (status: EventItem["order_status"]) =>
        allOrders.filter(order => order.order_status === status);

    return (
        <View className="bg-[#E0CEAA] h-screen">
            <View className="bg-[#F7F6F3] mx-6 my-6 rounded-3xl py-2 px-4 h-4/5">
                <Tabs defaultValue="soon">
                    <TabsList>
                        <TabsTrigger title="Próximos" value="soon" />
                        <TabsTrigger title="Passados" value="past" />
                        <TabsTrigger title="Pendentes" value="pending" />
                    </TabsList>

                    {["soon", "past", "pending"].map((status) => (
                        <TabsContent
                            key={status}
                            value={status}
                            className="flex flex-col items-center justify-start w-full"
                        >
                            {isLoading ? (
                                <View className="py-4"><TextInput value="Carregando..." editable={false} /></View>
                            ) : (
                                <>
                                    <FlatList
                                        data={filteredByStatus(status as EventItem["order_status"])}
                                        renderItem={renderItem}
                                        keyExtractor={(item) => item.id}
                                    />
                                    {hasNextPage && (
                                        <Button
                                            title={isFetchingNextPage ? "Carregando..." : "Carregar mais"}
                                            onPress={() => fetchNextPage()}
                                            disabled={isFetchingNextPage}
                                        />
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
