import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { z } from "zod";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useFullOrderStore } from "../store/useFullorderStore";

const eventSchema = z.object({
    eventName: z.string().min(1, "Nome do evento é obrigatório"),
    startDate: z.date(),
    duration: z.string().min(1, "Duração é obrigatória"),
    location: z.string().min(1, "Local é obrigatório"),
    guestCount: z.string().regex(/^\d+$/, "Número de convidados deve ser um número"),
    event_type: z.string().min(1, "Tipo de evento é obrigatório"),
});

type FormData = {
    eventName: string,
    startDate: Date,
    duration: string,
    location: string,
    guestCount: string,
    event_type: string,
}

export default function EventDataForm() {
    const { eventData, setEventData } = useFullOrderStore();
    const formDataInitialValues = {
        eventName: "",
        startDate: new Date(),
        duration: "",
        location: "",
        guestCount: "",
        event_type: "",
    }
    const [formData, setFormData] = useState<FormData>(formDataInitialValues);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: keyof FormData, value: string | Date) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
        setErrors(prev => ({
            ...prev,
            [field]: "",
        }));
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const newDate = new Date(formData.startDate);
            newDate.setFullYear(selectedDate.getFullYear());
            newDate.setMonth(selectedDate.getMonth());
            newDate.setDate(selectedDate.getDate());
            handleChange("startDate", newDate);
            setShowTimePicker(true);
        }
    };

    const onTimeChange = (event: any, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            const newDate = new Date(formData.startDate);
            newDate.setHours(selectedTime.getHours());
            newDate.setMinutes(selectedTime.getMinutes());
            newDate.setSeconds(0);
            handleChange("startDate", newDate);
        }
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

        const durationInHours = parseFloat(formData.duration);
        const endDate = new Date(formData.startDate.getTime() + durationInHours * 60 * 60 * 1000);
        setEventData({
            ...result.data,
            startDate: formData.startDate.toISOString(),
            endDate: endDate.toISOString(),
            event_type: formData.event_type ?? "",
        });
        setFormData(formDataInitialValues);

        router.push(routersStrings.newOrder_fullorder4)
    };

    useFocusEffect(
        useCallback(() => {
            if (eventData?.eventName) {
                setFormData({
                    eventName: eventData.eventName,
                    startDate: new Date(eventData.startDate),
                    duration: eventData.duration,
                    location: eventData.location,
                    event_type: eventData.event_type,
                    guestCount: eventData.guestCount
                });
            } else {
                setFormData(formDataInitialValues);
            }
        }, [eventData])
    );

    return (
        <View className="flex-1 justify-between">
            <ScrollView>
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

                {/* Seletor de Data e Hora */}
                <View className="mb-4">
                    <Text className="text-sm font-semibold text-gray-800 mb-1">Data e hora de início</Text>

                    {/* Botão para abrir o date picker */}
                    <TouchableOpacity
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{formData.startDate.toLocaleString()}</Text>
                    </TouchableOpacity>

                    {/* Date Picker para iOS */}
                    {Platform.OS === "ios" && showDatePicker && (
                        <DateTimePicker
                            value={formData.startDate}
                            mode="datetime"
                            display="spinner"
                            minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
                            onChange={(e, date) => {
                                if (date) handleChange("startDate", date);
                            }}
                        />
                    )}

                    {/* Date Picker para Android */}
                    {Platform.OS === "android" && showDatePicker && (
                        <DateTimePicker
                            value={formData.startDate}
                            mode="date"
                            minimumDate={new Date(new Date().setDate(new Date().getDate() + 2))}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                    {Platform.OS === "android" && showTimePicker && (
                        <DateTimePicker
                            value={formData.startDate}
                            mode="time"
                            display="default"
                            onChange={onTimeChange}
                        />
                    )}
                </View>

                {/* Duração em horas */}
                <View className="mb-4">
                    <Text className="text-sm font-semibold text-gray-800 mb-1">Duração (horas)</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                        value={formData.duration}
                        onChangeText={(value) => handleChange("duration", value)}
                        keyboardType="numeric"
                        placeholder="Ex: 2.5"
                    />
                    {errors.duration && <Text className="text-red-500 text-xs mt-1">{errors.duration}</Text>}
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
                    <Text className="text-sm font-semibold text-gray-800 mb-1">Número de convidados</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                        value={formData.guestCount}
                        onChangeText={(value) => {
                            const numericValue = value.replace(/[^0-9]/g, "");
                            const limitedValue = parseInt(numericValue, 10) > 999999 ? "999999" : numericValue;
                            handleChange("guestCount", limitedValue);
                        }}
                        keyboardType="numeric"
                    />
                    {errors.guestCount && <Text className="text-red-500 text-xs mt-1">{errors.guestCount}</Text>}
                </View>

                <View className="mb-4">
                    <Text className="text-sm font-semibold text-gray-800 mb-1">Tipo de evento</Text>
                    <TextInput
                        className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                        value={formData.event_type}
                        onChangeText={(value) => handleChange("event_type", value)}
                        keyboardType="default"
                    />
                    {errors.details && <Text className="text-red-500 text-xs mt-1">{errors.details}</Text>}
                </View>

            </ScrollView>

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
