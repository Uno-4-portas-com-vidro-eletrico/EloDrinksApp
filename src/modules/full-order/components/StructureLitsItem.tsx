import { Structure } from "@/modules/schema/Structure";
import { formatCurrency } from "@/modules/shared/utils/currentcy";
import formatFirstLetterToUpper from "@/modules/shared/utils/text";
import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
    structure: Structure
    isSelected: boolean;
    disabled: boolean;
    onSelect: (id: number) => void;
}

export default function StructureLsitItem({ structure, disabled, isSelected, onSelect }: Props) {
    return (
        <View className="bg-white p-5 mb-4 rounded-2xl shadow-xl border border-zinc-200 flex-row justify-between">
            <View>
                <Text className="text-xl font-semibold text-[#101820]">{formatFirstLetterToUpper(structure.name)}</Text>
                <Text className="text-lg font-bold text-[#101820]">{formatCurrency(structure.price)}</Text>
            </View>
            <TouchableOpacity
                className={`flex px-4 py-2 rounded-xl flex-row justify-center items-center ${isSelected
                    ? 'bg-green-600'
                    : disabled
                        ? 'bg-gray-300'
                        : 'bg-[#5A5040]'
                    }`}
                onPress={() => onSelect(structure.id)}
                disabled={disabled}
            >
                {isSelected && (
                    <FontAwesome name="check" size={14} color="#fff" style={{ marginRight: 6 }} />
                )}
                <Text className="text-white font-semibold">
                    {isSelected ? 'Escolhido' : 'Escolher'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}