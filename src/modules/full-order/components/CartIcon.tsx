import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { useCartStore } from "../store/useCartStore";

export default function CartIcon(props: TouchableOpacityProps) {
    const cart = useCartStore(state => state.cart);
    const amount = cart.products.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <TouchableOpacity
            {...props} // <- repassa o onPress e outros
            className="flex px-4 py-2 bg-[#5A5040] rounded-full items-center justify-center relative"
        >
            <FontAwesome5 name="shopping-cart" size={24} color="white" />
            <View className="absolute -top-2 -right-2 px-2 bg-red-600 rounded-full">
                <Text className="text-white text-lg font-bold">{amount}</Text>
            </View>
        </TouchableOpacity>
    );
}
