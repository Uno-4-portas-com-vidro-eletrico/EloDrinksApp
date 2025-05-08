import React from "react";
import { View, Text } from "react-native";

type ResumeDetailsProps = {
    eventData: any
};

export const ResumeDetails = ({ eventData }: ResumeDetailsProps) => {
    return (
        <View className="bg-white p-4 rounded-xl shadow-md items-center">
            <Text className="text-xl font-bold text-[#101820] mb-2">Resumo do Evento</Text>
            <Text className="text-sm text-gray-800 mb-1">Nome do Evento: <Text className="font-semibold">{eventData.eventName}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">Data: <Text className="font-semibold">{eventData.date}</Text></Text>
            <Text className="text-sm text-gray-800 mb-1">Local: <Text className="font-semibold">{eventData.location}</Text></Text>
            {eventData.details ? (
                <Text className="text-sm text-gray-800">Detalhes: <Text className="font-semibold">{eventData.details}</Text></Text>
            ) : null}
        </View>
    );
};