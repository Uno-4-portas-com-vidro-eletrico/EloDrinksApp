import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { routersStrings } from "@/modules/shared/utils/routers";
import { Banners } from "../components/banner";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/modules/auth/store/useUser";
import { usePackStore } from "@/modules/packages/store/useOrderStore";
import ContinueCard from "../components/continue-card";
import { router } from "expo-router";
import { useSales } from "@/hooks/useSales";
import { PromoTextCarousel } from "../components/promo-carousel";
import { useFullOrderStore } from "@/modules/full-order/store/useFullorderStore";

export default function PageHome() {
    const { setUser, user } = useUserStore();
    const { pack, eventData, clearEventData, clearPack } = usePackStore();
    const { cart, eventData: eventDataFull, structure, clearCart, clearEventData: clearEventDataFull, clearStructure } = useFullOrderStore();
    const { data } = useUser();
    const { data: sales } = useSales(1, 3)

    useEffect(() => {
        if (data) setUser(data);
    }, [data]);

    function handleConfirm() {
        if (eventData) router.push(routersStrings.newOrder_packages2);
        else if (pack) router.push(routersStrings.newOrder_packages);
        else if (eventDataFull) router.push(routersStrings.newOrder_fullorder3);
        else if (structure) router.push(routersStrings.newOrder_fullorder2);
        else if (cart.products.length != 0) router.push(routersStrings.newOrder_fullorder);
    }

    function handleCancel() {
        clearPack();
        clearEventData();
        clearCart();
        clearEventDataFull();
        clearStructure();
    }

    return (
        <View>
            <View className="mb-2 mt-4 px-4">
                <Text
                    className="font-semibold text-[#101820]"
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    style={{ fontSize: 24 }}
                >
                    Olá, <Text className="text-primary-500">{user?.name}</Text> 👋
                </Text>
            </View>
            {(eventData || pack || eventDataFull || structure || cart.products.length != 0) &&
                <ContinueCard onCancel={handleCancel} onConfirm={handleConfirm} />
            }
            <View className="mt-6" />
            {sales && sales.length > 0 && (
                <PromoTextCarousel
                    items={sales.map(sale => {
                        const promoTemplates = [
                            `${sale.name} com ${sale.discount_percentage}% de desconto!`,
                            `Aproveite ${sale.discount_percentage}% OFF em ${sale.name}!`,
                            `Promoção: ${sale.name} por menos! Desconto de ${sale.discount_percentage}%`,
                            `Desconto imperdível: ${sale.name} com ${sale.discount_percentage}% OFF!`,
                            `Só hoje: ${sale.name} com ${sale.discount_percentage}% de desconto!`
                        ];
                        const randomIndex = Math.floor(Math.random() * promoTemplates.length);
                        return promoTemplates[randomIndex];
                    })}
                />
            )}
            <View className="mt-4" />
            <Banners items={[
                {
                    imageUrl: "https://res.cloudinary.com/duxmkrglm/image/upload/v1745672656/owkqt4td0xderznpzsoh.png",
                    link: routersStrings.history
                },
                {
                    imageUrl: "https://res.cloudinary.com/duxmkrglm/image/upload/v1745672800/xladvuzrca1anq6eg6mr.png",
                    link: routersStrings.history
                }
            ]} />
        </View>
    );
}
