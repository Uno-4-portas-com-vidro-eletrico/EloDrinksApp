import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View } from "react-native";

const PageNewOrderThird = React.lazy(
    () => import("@/modules/full-order/pages/third"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <View className="bg-[#E0CEAA] flex-1">
                <PageNewOrderThird />
            </View>
        </React.Suspense>
    );
}