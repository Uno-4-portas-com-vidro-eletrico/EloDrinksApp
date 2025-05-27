import { DialogTrigger } from "@/modules/shared/components/ui/dialog";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { formatCurrency } from "@/modules/shared/utils/currentcy";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProductInCart } from "@/modules/schema/Product";
import formatFirstLetterToUpper from "@/modules/shared/utils/text";
import { useFullOrderStore } from "../store/useFullorderStore";


export default function CartDialogContent() {
    const { cart, updateCart } = useFullOrderStore()

    const removeItemFromCart = (product: ProductInCart) => {
        updateCart({ ...product, quantity: 0 })
    }

    return (
        <View>
            <View className="pb-4">
                <Text className="text-2xl font-bold">Carrinho</Text>
            </View>
            <FlatList
                data={cart.products}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => (
                    <View className="flex flex-row w-full py-1 justify-between items-center">
                        <TouchableOpacity
                            className="p-2 flex justify-center items-center"
                            onPress={() => removeItemFromCart(item)}
                        >
                            <FontAwesome5 name="times" color="red" />
                        </TouchableOpacity>
                        <View className="flex-1 flex-row justify-between items-center ml-2">
                            <Text className="text-xl font-medium line-clamp-1">{formatFirstLetterToUpper(item.name)}</Text>
                            <View className="flex flex-row">
                                <Text className="text-xl font-medium">{item.quantity}</Text>
                                <Text className="text-xl font-medium mx-1">x</Text>
                                <Text className="text-xl font-medium">{formatCurrency(item.price)}</Text>
                            </View>
                        </View>
                    </View>
                )}
                ItemSeparatorComponent={() => (<View className="border-b border-zinc-200" />)}
                ListFooterComponent={() => (
                    <View className="flex-row justify-between items-center mb-4 pl-8 border-t border-zinc-200">
                        <Text className="text-xl font-medium line-clamp-1">Total:</Text>
                        <Text className="text-xl font-medium">{formatCurrency(cart.total)}</Text>
                    </View>
                )}
            />
            <DialogTrigger>
                <TouchableOpacity
                    className="flex px-4 py-2 bg-[#9D4815] rounded-xl items-center"
                >
                    <Text className="text-white text-xl">Fechar</Text>
                </TouchableOpacity>
            </DialogTrigger>
        </View>
    )
}