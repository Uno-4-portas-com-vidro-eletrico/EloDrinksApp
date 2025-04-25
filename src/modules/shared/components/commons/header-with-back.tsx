import { Text } from "@/modules/shared/components/ui/text";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable } from "react-native";
import { View } from "react-native";

export const HeaderWithBack: React.FC = () => {
    return (
        <View className="h-32 p-4 flex-row w-full items-center justify-between">
            <Pressable
                className="flex flex-row item-center justify-center"
                onPress={() => router.back()}
            >
                <Feather name="chevron-left" size={28} color="white" />
                <Text className=" text-white text-lg">Voltar</Text>
            </Pressable>
            <Image source={require("@/assets/images/logo-mini.png")} />
        </View>
    );
};
