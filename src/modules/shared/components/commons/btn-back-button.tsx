import { Alert, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface BtnBackHeaderProps {
    confirmBack?: boolean;
    goBackTo?: string;
}

export const BtnBackHeader = ({ confirmBack, goBackTo }: BtnBackHeaderProps) => {
    const handleBackPress = () => {
        const goBack = () => {
            if (goBackTo) {
                router.replace(goBackTo);
            } else {
                router.back();
            }
        };

        if (confirmBack) {
            Alert.alert(
                "Confirmar",
                "Tem certeza que deseja sair?\nVocê perderá TODO o progresso do seu orçamento!",
                [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Sim", onPress: goBack },
                ]
            );
        } else {
            goBack();
        }
    };

    return (
        <Pressable className="ml-2" onPress={handleBackPress}>
            <AntDesign name="arrowleft" size={32} color="#E0CEAA" />
        </Pressable>
    );
};
