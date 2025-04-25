import { router } from "expo-router";
import { TouchableOpacity, Image } from "react-native";
import { routersStrings } from "../../utils/routers";

export const IconHeaderDefault: React.FC = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginRight: 16 }}
            onPress={() => router.push(routersStrings.home)}
        >
            <Image
                source={require("@/assets/images/logo-mini.png")}
                resizeMode="contain"
                style={{ width: 20, height: 40 }}
            />
        </TouchableOpacity>
    );
};
