import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { View, Text } from "react-native";

// const PageHome = React.lazy(
//     () => import("@/modules/home/pages/home"),
// );

export default function Home() {
    return (
        // <React.Suspense fallback={<LoadingIndicator />}>
        //     <View className="bg-[#E0CEAA] h-full">
        //         <PageHome />
        //     </View>
        // </React.Suspense>
        <View>
            <Text>
                new order
            </Text>
        </View>
    );
}
