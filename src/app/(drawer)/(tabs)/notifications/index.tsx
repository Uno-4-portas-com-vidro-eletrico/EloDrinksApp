import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View } from "react-native";

const PageNotification = React.lazy(
    () => import("@/modules/notifications/pages/notification"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <View className="bg-[#E0CEAA] h-full pb-4">
                <PageNotification />
            </View>
        </React.Suspense>
    );
}
