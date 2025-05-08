import React from "react";
import { View, Text } from "react-native";

type ResumePackageProps = {
    packData: any
};

export const ResumePackage = ({ packData }: ResumePackageProps) => {
    return (
        <View className="bg-white p-4 rounded-xl shadow-md items-center">
            <Text className="text-xl font-bold text-[#101820] mb-2">Resumo do Pacote</Text>
            <Text className="text-sm text-gray-800 mb-1">Nome do Pacote: <Text className="font-semibold">{packData.name}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">Tipo: <Text className="font-semibold">{packData.type}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">Convidados: <Text className="font-semibold">{packData.guests}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">R$ <Text className="font-semibold">{packData.price.toFixed(2)}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">Descrição: <Text className="font-semibold">{packData.description}</Text></Text>
        </View>
    );
};