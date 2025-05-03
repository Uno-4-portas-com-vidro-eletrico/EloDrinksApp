import { useState } from "react";
import { Alert, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export const BtnBackHeader = ({ confirmBack }: { confirmBack?: boolean }) => {
    const handleBackPress = () => {
        if (confirmBack) {
            Alert.alert(
                "Confirmar",
                "Tem certeza que deseja sair?",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Sim", onPress: () => router.back() },
                ]
            );
        } else {
            router.back();
        }
    };

    return (
        <Pressable className="ml-2" onPress={handleBackPress}>
            <AntDesign name="arrowleft" size={32} color="#E0CEAA" />
        </Pressable>
    );
};
