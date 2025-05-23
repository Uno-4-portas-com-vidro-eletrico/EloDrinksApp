import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { routersStrings } from "@/modules/shared/utils/routers";
import { Banners } from "../components/banner";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/modules/auth/store/useUser";
import { usePackStore } from "@/modules/packages/store/useOrderStore";
import ContinueCard from "../components/continue-card";
import { router } from "expo-router";

export default function PageHome() {
    const { setUser } = useUserStore();
    const { pack, eventData, clearEventData, clearPack } = usePackStore();
    const { data } = useUser();

    useEffect(() => {
        if (data) setUser(data);
    }, [data]);

    function handleConfirm() {
        if (eventData) router.push(routersStrings.newOrder_packages2);
        else if (pack) router.push(routersStrings.newOrder_packages);
    }

    function handleCancel() {
        clearPack();
        clearEventData();
    }

    return (
        <View>
            {(eventData || pack) &&
                <ContinueCard onCancel={handleCancel} onConfirm={handleConfirm} />
            }
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
