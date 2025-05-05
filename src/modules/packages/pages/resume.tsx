import { Stepper } from "@/modules/shared/components/commons/stepper";
import { View, Text } from "react-native";

const PageNewOrderResume = () => {
    return (
        <View className="bg-white rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={3} totalSteps={3} />
        </View>
    );
}

export default PageNewOrderResume;