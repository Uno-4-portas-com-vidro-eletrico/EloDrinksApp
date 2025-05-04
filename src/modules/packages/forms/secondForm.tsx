import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { z } from "zod";
import { routersStrings } from "@/modules/shared/utils/routers";

const eventSchema = z.object({
    eventName: z.string().min(1, "Nome do evento é obrigatório"),
    date: z.string().min(1, "Data é obrigatória"),
    location: z.string().min(1, "Local é obrigatório"),
    details: z.string()
});

const EventForm = () => {
    const [formData, setFormData] = useState({
        eventName: "",
        date: "",
        location: "",
        details: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = () => {
        const result = eventSchema.safeParse(formData);
        if (!result.success) {
            const newErrors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
                if (err.path[0]) {
                    newErrors[err.path[0] as string] = err.message;
                }
            });
            setErrors(newErrors);
            return;
        }
        router.push(routersStrings.newOrder_fullorder);
        console.log("Formulário enviado com sucesso", result.data);
    };

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setFormData({
                    eventName: "",
                    date: "",
                    location: "",
                    details: "",
                });
                setErrors({});
            };
        }, [])
    );

    return (
        <View>
            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Nome do evento</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    value={formData.eventName}
                    onChangeText={(value) => handleChange("eventName", value)}
                    keyboardType="default"
                />
                {errors.eventName && <Text className="text-red-500 text-xs mt-1">{errors.eventName}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Data</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    value={formData.date}
                    onChangeText={(value) => {
                        const numericValue = value.replace(/[^0-9]/g, "");
                        const limitedValue = numericValue.slice(0, 8);
                        const formattedValue = limitedValue
                            .replace(/^(\d{2})(\d)/, "$1/$2")
                            .replace(/^(\d{2}\/\d{2})(\d)/, "$1/$2");
                        handleChange("date", formattedValue);
                    }}
                    keyboardType="numeric"
                    placeholder="DD/MM/AAAA"
                    maxLength={10}
                />
                {errors.date && <Text className="text-red-500 text-xs mt-1">{errors.date}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Local</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    value={formData.location}
                    onChangeText={(value) => handleChange("location", value)}
                    keyboardType="default"
                />
                {errors.location && <Text className="text-red-500 text-xs mt-1">{errors.location}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Detalhes do evento (opcional)</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white h-28 text-start"
                    value={formData.details}
                    onChangeText={(value) => handleChange("details", value)}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                {errors.details && <Text className="text-red-500 text-xs mt-1">{errors.details}</Text>}
            </View>
            <Text
                className="text-sm text-gray-500 text-center"
                onPress={() => { alert("No campo detalhes do evento, que você irá falar as alterações que deseja fazer no pacote, que serão analisadas pela nossa equipe.") }}
            >
                O que são os detalhes do evento?
            </Text>

            <TouchableOpacity
                className="mt-4 bg-[#9D4815] py-3 rounded-full flex-row items-center justify-center"
                onPress={handleSubmit}
            >
                <Text className="text-white font-semibold mr-2">Avançar</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default EventForm;
