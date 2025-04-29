import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View, Text, ScrollView } from "react-native";

const PageNewOrderInitial = React.lazy(
    () => import("@/modules/new-order/pages/initial"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <ScrollView className="bg-[#E0CEAA] h-full">
                <PageNewOrderInitial />
            </ScrollView>
        </React.Suspense>
    );
}
