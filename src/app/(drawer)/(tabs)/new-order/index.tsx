import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { ScrollView } from "react-native";

const PageSelector = React.lazy(
    () => import("@/modules/new-order/pages/selector"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <ScrollView className="bg-[#E0CEAA] h-full">
                <PageSelector />
            </ScrollView>
        </React.Suspense>
    );
}
