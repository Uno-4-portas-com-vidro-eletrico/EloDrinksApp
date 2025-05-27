import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View } from "react-native";

const PageNewOrderSecond = React.lazy(
    () => import("@/modules/full-order/pages/second"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <View className="bg-[#E0CEAA] flex-1">
                <PageNewOrderSecond />
            </View>
        </React.Suspense>
    );
}