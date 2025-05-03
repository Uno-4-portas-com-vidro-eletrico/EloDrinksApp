import { LoadingIndicator } from "@/modules/shared/components/commons/loading";
import React from "react";
import { ScrollView, Text } from "react-native";

export default function Home() {
    return (
        <React.Suspense fallback={<LoadingIndicator />}>
            <ScrollView className="bg-[#E0CEAA] h-full">
                <Text>
                    Pacote
                </Text>
            </ScrollView>
        </React.Suspense>
    );
}
