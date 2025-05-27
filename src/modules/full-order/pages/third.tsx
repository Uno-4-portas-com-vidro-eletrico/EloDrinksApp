import { View } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import EventDataForm from "../forms/eventDataForm";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-[#F7F6F3] rounded-3xl px-6 py-2 pb-6 mx-4 my-6 shadow-md flex-1">
            <Stepper currentStep={3} totalSteps={4} />
            <EventDataForm />
        </View>
    );
}

export default PageNewOrderInitial;