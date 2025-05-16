import React from "react";
import { View, Text } from "react-native";

type ResumeDetailsProps = {
    eventData: any
};

export const ResumeDetails = ({ eventData }: ResumeDetailsProps) => {
    return (
        <View className="bg-white p-4 rounded-xl shadow-md">
            <Text className="text-xl font-bold text-[#101820] bg-[#E0CEAA] py-1 px-1">Resumo do Evento e Observações</Text>
            <View className="pl-2 border-x-0 border-l border-r border-b pt-2 pb-4 border-[#E0CEAA]">
                <Text className="text-sm text-gray-800 mb-1 font-semibold">Nome do Evento: <Text className="font-regular">{eventData.eventName}</Text></Text>
                <Text className="text-sm text-gray-800 mb-1 font-semibold">Data: <Text className="font-regular">{eventData.date}</Text></Text>
                <Text className="text-sm text-gray-800 mb-1 font-semibold">Local: <Text className="font-regular">{eventData.location}</Text></Text>
                {eventData.details ? (
                    <Text className="text-sm text-gray-800 font-semibold">Detalhes: <Text className="font-regular">{eventData.details}</Text></Text>
                ) : null}
            </View>
        </View>
    );
};