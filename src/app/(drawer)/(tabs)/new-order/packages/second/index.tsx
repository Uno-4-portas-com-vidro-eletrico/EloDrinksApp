import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { ScrollView } from "react-native";

const PageNewOrderSecond = React.lazy(
    () => import("@/modules/packages/pages/second"),
);

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <ScrollView className="bg-[#E0CEAA] h-full">
                <PageNewOrderSecond />
            </ScrollView>
        </React.Suspense>
    );
}