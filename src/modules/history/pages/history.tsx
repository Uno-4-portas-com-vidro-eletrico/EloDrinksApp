import React, { useCallback } from "react";
import { View } from "react-native";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/modules/shared/components/ui/tabs";
import { useOrdersInfinite } from "@/hooks/useOrders";
import { useUserStore } from "@/modules/auth/store/useUser";
import { OrdersTab } from "../components/order-tab";
import { useFocusEffect } from "expo-router";

const PageHistory = () => {
    const { user } = useUserStore();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch
    } = useOrdersInfinite(user?.id ?? 0, 10);

    useFocusEffect(
        useCallback(() => {
            if (user?.id) {
                refetch();
            }
        }, [user?.id, refetch])
    );

    const allOrders = data?.pages.flat() ?? [];

    const filterOrders = (tab: "pending" | "soon" | "past") => {
        const now = new Date();

        return allOrders.filter((order) => {
            if (tab === "pending") return order.order_status === "pending";

            if (order.order_status !== "confirmed") return false;

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

                    {["pending", "soon", "past"].map((tab) => (
                        <TabsContent key={tab} value={tab} className="flex flex-col items-center justify-start w-full">
                            <OrdersTab
                                orders={filterOrders(tab as any)}
                                isLoading={isLoading}
                                isFetchingNextPage={isFetchingNextPage}
                                hasNextPage={hasNextPage}
                                onLoadMore={fetchNextPage}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </View>
        </View>
    );
};

export default PageHistory;