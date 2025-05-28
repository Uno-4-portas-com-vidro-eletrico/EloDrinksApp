import { View, Text, Modal, TouchableOpacity } from "react-native";
import { Stepper } from "../../shared/components/commons/stepper";
import { Button } from "@/modules/shared/components/ui/button";
import { router } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "@/modules/shared/components/ui/alert-dialog";
import { usePackStore } from "@/modules/packages/store/useOrderStore";
import { useState } from "react";
import { useFullOrderStore } from "@/modules/full-order/store/useFullorderStore";

const PageSelector = () => {
    const { pack, clearPack, clearEventData } = usePackStore();
    const { cart } = useFullOrderStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    function handleChoosePackages() {
        if (pack || cart.products.length > 0) {
            setIsModalVisible(true);
        } else {
            router.push(routersStrings.newOrder_packages);
        }
    }

    function handleChooseFull() {
        if (pack || cart.products.length > 0) {
            setIsModalVisible(true);
        } else {
            router.push(routersStrings.newOrder_fullorder);
        }
    }

    function handleModalConfirm() {
        usePackStore.persist.clearStorage();
        setIsModalVisible(false);
        clearPack();
        clearEventData();
        router.push(routersStrings.newOrder_packages);
    }

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
                        onPress={handleChoosePackages}
                    />
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Text
                                className="text-sm text-gray-500 text-center"
                            >
                                Dúvidas? Toque aqui para saber mais.
                            </Text>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Duvidas</AlertDialogTitle>
                            <AlertDialogText>Escolha esta opção para visualizar pacotes prontos criados pela nossa equipe.</AlertDialogText>
                        </AlertDialogContent>
                    </AlertDialog>
                </View>
                <View className="flex flex-col items-center space-y-2">
                    <Button
                        className="h-20 w-full"
                        size={"lg"}
                        label="Montar Orçamento Completo"
                        onPress={handleChooseFull}
                    />

                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Text
                                className="text-sm text-gray-500 text-center"
                            >
                                Dúvidas? Toque aqui para saber mais.
                            </Text>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>Duvidas</AlertDialogTitle>
                            <AlertDialogText>Escolha esta opção para montar seu orçamento do zero.</AlertDialogText>
                        </AlertDialogContent>
                    </AlertDialog>

                    <Modal
                        visible={isModalVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setIsModalVisible(false)}
                    >
                        <View className="flex-1 items-center justify-center bg-black/50 px-6">
                            <View className="bg-white rounded-2xl p-6 w-full max-w-md">
                                <Text className="text-lg font-semibold mb-2 text-center">Deseja continuar?</Text>
                                <Text className="text-gray-600 text-center mb-6">
                                    Você já começou um pacote. Deseja apagar o anterior e começar um novo?
                                </Text>

                                <View className="flex-row justify-end gap-4">
                                    <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                        <Text className="text-gray-500">Cancelar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleModalConfirm}>
                                        <Text className="text-red-500 font-semibold">Sim, continuar novo</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </View>
    );
}

export default PageSelector;