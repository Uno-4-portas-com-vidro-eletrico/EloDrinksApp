import { View } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import EventForm from "../forms/eventForm";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-white rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={2} totalSteps={3} />
            <EventForm />
        </View>
    );
}

export default PageNewOrderInitial;