import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "@/modules/shared/components/ui/alert-dialog";
import { View, Text, TouchableOpacity } from 'react-native';

type ContinueCardProps = {
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ContinueCard({ onConfirm, onCancel }: ContinueCardProps) {
    return (
        <View className="bg-[#F6EEE3] rounded-xl p-4 mx-4 mt-4 shadow-md">
            <Text className="text-[#4A2C18] text-base font-bold mb-2">
                📋 Orçamento em andamento
            </Text>

            <Text className="text-[#6B4B3E] mb-4">
                Você iniciou um orçamento. Deseja continuar?
            </Text>

            <View className="flex-row justify-between">
                <TouchableOpacity
                    className="bg-[#8D4A24] px-4 py-2 rounded-lg"
                    onPress={onConfirm}
                >
                    <Text className="text-white font-bold">Continuar</Text>
                </TouchableOpacity>

                <AlertDialog>
                    <AlertDialogTrigger>
                        <TouchableOpacity className="border border-[#8D4A24] px-4 py-2 rounded-lg">
                            <Text className="text-[#8D4A24] font-bold">Descartar</Text>
                        </TouchableOpacity>
                    </AlertDialogTrigger>
                    <AlertDialogContent onConfirm={onCancel}>
                        <AlertDialogTitle>Deseja cancelar?</AlertDialogTitle>
                        <AlertDialogText>
                            Isso apagará os dados atuais do seu pacote.
                        </AlertDialogText>
                        <View className="flex-row justify-end gap-2 mt-4">
                        </View>
                    </AlertDialogContent>
                </AlertDialog>
            </View>
        </View>
    );
}
