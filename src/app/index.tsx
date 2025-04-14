import { Button } from "@/modules/shared/components/ui/button";
import { routersStrings } from "@/modules/shared/utils/routers";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-bold text-blue-500">Hello, Expo Router + Tailwind!</Text>
            <Button label="btn" onPress={() => router.push(routersStrings.home)} />
        </View>
    );
}