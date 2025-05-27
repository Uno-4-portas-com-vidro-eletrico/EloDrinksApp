import { Text, View } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import BarStructureForm from "../forms/barStructureForm";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-[#F7F6F3] rounded-3xl px-6 py-2 pb-6 mx-4 my-6 shadow-md flex-1">
            <Stepper currentStep={2} totalSteps={4} />
            <View className="flex flex-col items-center justify-between">
                <Text className="text-lg font-semibold text-gray-800 text-center">
                    Seleção de Estruturas
                </Text>
                <Text className="text-sm text-gray-500 mb-2 text-center">
                    Escolha a Estrutura que mais combina com seu evento.
                </Text>
            </View>
            <BarStructureForm />
        </View>
    );
}

export default PageNewOrderInitial;