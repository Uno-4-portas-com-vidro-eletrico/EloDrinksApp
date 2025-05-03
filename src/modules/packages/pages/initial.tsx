import { View, Text } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import PackageList from "../components/packages-list";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-[#F7F6F3] rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md flex-1">
            <Stepper currentStep={1} totalSteps={3} />
            <View className="flex flex-col items-center justify-between">
                <Text className="text-lg font-semibold text-gray-800 text-center">
                    Seleção de Pacotes
                </Text>
                <Text className="text-sm text-gray-500 mb-2 text-center">
                    Veja e escolha o pacote que mais combina com seu evento.
                </Text>
            </View>
            <PackageList />
        </View>
    );
}

export default PageNewOrderInitial;