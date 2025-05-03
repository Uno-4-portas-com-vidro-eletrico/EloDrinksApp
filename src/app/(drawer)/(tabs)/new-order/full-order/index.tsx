import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { ScrollView } from "react-native";

const PageNewOrderInitial = React.lazy(
    () => import("@/modules/full-order/pages/initial"),
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