import { View, ScrollView } from "react-native";
import { Stepper } from "../components/stepper";
import EventForm from "../forms/initialForm";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-white rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={1} totalSteps={3} />
            <EventForm />
        </View>
    );
}

export default PageNewOrderInitial;