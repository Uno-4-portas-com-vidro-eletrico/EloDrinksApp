import { router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { routersStrings } from "../../utils/routers";
import Feather from '@expo/vector-icons/Feather';

export const IconHeaderDefault: React.FC = () => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{ marginRight: 16 }}
            onPress={() => router.push(routersStrings.home)}
        >
            <Feather name="check" size={48} color="black" />
        </TouchableOpacity>
    );
};
