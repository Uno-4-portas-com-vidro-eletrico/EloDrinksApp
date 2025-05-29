import { Alert, Pressable } from "react-native";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

interface BtnBackHeaderProps {
    confirmBack?: boolean;
    confirmBackFn?: () => void;
    goBackTo?: string;
}

export const BtnBackHeader = ({ confirmBack, confirmBackFn, goBackTo }: BtnBackHeaderProps) => {
    const goBack = () => {
        if (goBackTo) {
            router.replace(goBackTo);
        } else {
            router.back();
        }
    };

    if (confirmBack)
        return (
            <AlertDialog>
                <AlertDialogTrigger>
                    <Pressable className="ml-2">
                        <AntDesign name="arrowleft" size={32} color="#E0CEAA" />
                    </Pressable>
                </AlertDialogTrigger>
                <AlertDialogContent onConfirm={() => {
                    if (confirmBackFn) confirmBackFn();
                    goBack();
                }} >
                    <AlertDialogTitle>Confirmar</AlertDialogTitle>
                    <AlertDialogText>{"Tem certeza que deseja sair?\nVocê perderá TODO o progresso do seu orçamento!"}</AlertDialogText>
                </AlertDialogContent>
            </AlertDialog>
        )

    return (
        <Pressable className="ml-2" onPress={goBack}>
            <AntDesign name="arrowleft" size={32} color="#E0CEAA" />
        </Pressable>
    );
};
