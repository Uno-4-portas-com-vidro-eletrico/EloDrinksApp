import { Text, View } from "react-native"
import formatFirstLetterToUpper from "@/modules/shared/utils/text"


type Props = {
    title: string
}

export default function ProductListHeader({ title }: Props) {
    return (
        <View>
            <Text className="font-semibold text-xl pb-4">
                {formatFirstLetterToUpper(title)}
            </Text>
        </View>
    )
}