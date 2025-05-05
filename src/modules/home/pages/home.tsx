import React from "react";
import { View, Text, Image } from "react-native";
import { routersStrings } from "@/modules/shared/utils/routers";
import { Banners } from "../components/banner";
import { Button } from "@/modules/shared/components/ui/button";
import { useTokenStore } from "@/modules/auth/store/useTokenStore";

export default function PageHome() {
    const resetToken = useTokenStore(state => state.resetToken)
    return (
        <View className="mt-6">
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
            <Button label="log out" onPress={() => resetToken()}/>
        </View>
    );
}
