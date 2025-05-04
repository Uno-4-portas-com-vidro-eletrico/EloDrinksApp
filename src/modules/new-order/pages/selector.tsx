import { View, Text } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import { Button } from "@/modules/shared/components/ui/button";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";

const PageSelector = () => {
    return (
        <View className="bg-white rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={1} totalSteps={3} />
            <View className="flex flex-col items-center justify-between mt-4 mb-2">
                <Text className="text-lg font-semibold text-gray-800 mb-1 text-center">
                    Selecione como quer montar seu orçamento
                </Text>
                <Text className="text-sm text-gray-500 mb-2 text-center">
                    Escolha se quer ver os pacotes que nossa equipe deixou prontos, ou se deseja montar seu orçamento do zero.
                </Text>
            </View>
            <View className="mt-6 mb-16 space-y-10">
                <View className="flex flex-col items-center space-y-2">
                    <Button
                        className="h-16 w-full"
                        size={"lg"}
                        label="Escolher Pacotes"
                        onPress={() => { router.push(routersStrings.newOrder_packages) }}
                    />
                    <Text
                        className="text-sm text-gray-500 text-center"
                        onPress={() => { alert("Escolha esta opção para visualizar pacotes prontos criados pela nossa equipe.") }}
                    >
                        Dúvidas? Toque aqui para saber mais.
                    </Text>
                </View>
                <View className="flex flex-col items-center space-y-2">
                    <Button
                        className="h-20 w-full"
                        size={"lg"}
                        label="Montar Orçamento Completo"
                        onPress={() => { router.push(routersStrings.newOrder_fullorder) }}
                    />
                    <Text
                        className="text-sm text-gray-500 text-center"
                        onPress={() => { alert("Escolha esta opção para montar seu orçamento do zero.") }}
                    >
                        Dúvidas? Toque aqui para saber mais.
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default PageSelector;