import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View } from "react-native";

const PageNewOrderInitial = React.lazy(
    () => import("@/modules/packages/pages/initial"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <View className="bg-[#E0CEAA] h-full">
                <PageNewOrderInitial />
            </View>
        </React.Suspense>
    );
}