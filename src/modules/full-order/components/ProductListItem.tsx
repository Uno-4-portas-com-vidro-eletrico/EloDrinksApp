import { ProductInCart } from "@/modules/schema/Product"
import { formatCurrency } from "@/modules/shared/utils/currentcy"
import { useEffect, useState } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import { useCartStore } from "../store/useCartStore"
import { FontAwesome5 } from "@expo/vector-icons"
import formatFirstLetterToUpper from "@/modules/shared/utils/text"

type Props = {
    product: ProductInCart
}

export default function ProductListItem({ product }: Props) {
    const { cart, updateCart } = useCartStore();
    const productInCart = cart.products.find(p => p.id === product.id);
    const [quantity, setQuantity] = useState<number>(productInCart?.quantity ?? 0);

    const handleChange = (amount: string) => {
        const value = Number(amount);

        if (value > 99) setQuantity(99);
        else if (value < 0) setQuantity(0);
        else setQuantity(value);
    };

    const subtractFromQuantity = (amount: number) => {
        setQuantity(prev => Math.max(0, prev - amount));
    };

    const addToQuantity = (amount: number) => {
        setQuantity(prev => Math.min(99, prev + amount));
    };

    useEffect(() => {
        updateCart({ ...product, quantity });
    }, [quantity]);

    return (
        <View className="flex-row w-full mb-4 p-4 border-2 rounded-3xl border-zinc-200 bg-white">
            <Image
                src={product.img_url}
                width={100}
                height={100}
                className="w-[100px] h-[100px] object-cover rounded-2xl"
            />

            <View className="flex-1 w-full ml-4">
                <View className="flex justify-between">
                    <Text className="text-xl font-semibold text-[#101820] line-clamp-1">
                        {formatFirstLetterToUpper(product.name)}
                    </Text>
                    <Text className="text-lg font-bold text-[#101820] line-clamp-1">
                        {formatCurrency(product.price)}
                    </Text>
                    <View className="flex-row w-full mt-2 justify-between items-center">
                        <TouchableOpacity
                            className="flex-1 px-4 py-2 bg-[#9D4815] rounded-xl items-center"
                            onPress={() => subtractFromQuantity(1)}
                        >
                            <FontAwesome5 name="minus" size={16} color="white" />
                        </TouchableOpacity>
                        <TextInput
                            onChangeText={handleChange}
                            value={`${productInCart?.quantity ?? 0}`}
                            placeholder="useless placeholder"
                            keyboardType="numeric"
                            className="border-2 border-zinc-200 p-2 rounded-xl mx-2 min-w-[36px] text-center"
                        />
                        <TouchableOpacity
                            className="flex-1 px-4 py-2 bg-[#5A5040] rounded-xl items-center"
                            onPress={() => addToQuantity(1)}
                        >
                            <FontAwesome5 name="plus" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}