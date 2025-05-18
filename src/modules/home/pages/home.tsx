import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { routersStrings } from "@/modules/shared/utils/routers";
import { Banners } from "../components/banner";
import { useUser } from "@/hooks/useUser";
import { useUserStore } from "@/modules/auth/store/useUser";

export default function PageHome() {
    const { setUser } = useUserStore();
    const { data } = useUser();

    useEffect(() => {
        if (data)
            setUser(data)
    }, [data]);

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
        </View>
    );
}
