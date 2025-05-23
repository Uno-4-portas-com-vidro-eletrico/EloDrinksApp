import { View } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import ProductsForm from "../forms/productsForm";

const PageNewOrderInitial = () => {
    return (
        <View className="bg-[#F7F6F3] rounded-3xl px-6 py-2 pb-6 mx-4 my-6 shadow-md flex-1">
            <Stepper currentStep={1} totalSteps={3} />
            <ProductsForm />
        </View>
    );
};


export default PageNewOrderInitial;