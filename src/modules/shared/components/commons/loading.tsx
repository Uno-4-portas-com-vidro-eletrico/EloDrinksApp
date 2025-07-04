import { ActivityIndicator, View } from "react-native";

export const LoadingIndicator = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#9D4815" />
        </View>
    );
};
