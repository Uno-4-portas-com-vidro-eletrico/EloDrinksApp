import { Stepper } from "@/modules/shared/components/commons/stepper";
import { Alert, ScrollView, View } from "react-native";
import { ResumeDetails } from "../components/resume-details";
import { usePackStore } from "../store/useOrderStore";
import { ResumePackage } from "../components/package-details";
import { Button } from "@/modules/shared/components/ui/button";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";

const PageNewOrderResume = () => {
    const { eventData, pack } = usePackStore();

    return (
        <View className="bg-white rounded-3xl px-6 py-2 mx-4 mt-6 shadow-md">
            <Stepper currentStep={3} totalSteps={3} />
            <ScrollView className="h-4/6">
                <ResumeDetails eventData={eventData} />
                <ResumePackage packData={pack} />
            </ScrollView>
            <View className="space-y-4 my-4">
                <Button
                    className="bg-[#5A5040]"
                    label="Cancelar"
                    onPress={() => {
                        Alert.alert(
                            "Confirmar",
                            "Atenção!!!\nVocê voltará ao inicio do seu orçamento!",
                            [
                                { text: "Cancelar", style: "cancel" },
                                { text: "Sim", onPress: () => router.push(routersStrings.newOrder_packages) },
                            ]
                        );
                    }}
                />
                <Button
                    label="Confirmar"
                />
            </View>
        </View>
    );
}

export default PageNewOrderResume;