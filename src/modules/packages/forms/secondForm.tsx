import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform, Button } from "react-native";
import DateTimePicker, { Event as DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { z } from "zod";
import { router, useFocusEffect } from "expo-router";
import { routersStrings } from "@/modules/shared/utils/routers";
import { usePackStore } from "../store/useOrderStore";
import { AlertDialog, AlertDialogContent, AlertDialogText, AlertDialogTitle, AlertDialogTrigger } from "@/modules/shared/components/ui/alert-dialog";
import { PackageDetailsModal } from "../components/package-details-modal";

const eventSchema = z.object({
    eventName: z.string().min(1, "Nome do evento é obrigatório"),
    startDate: z.date(),
    duration: z.string().min(1, "Duração é obrigatória"),
    location: z.string().min(1, "Local é obrigatório"),
    details: z.string(),
});

type FormData = {
    eventName: string;
    startDate: Date;
    duration: string;
    location: string;
    details: string;
};

const EventForm = () => {
    const { pack, setEventData, eventData } = usePackStore();

    const [formData, setFormData] = useState<FormData>({
        eventName: "",
        startDate: new Date(),
        duration: "",
        location: "",
        details: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    useFocusEffect(
        useCallback(() => {
            if (eventData?.eventName) {
                setFormData({
                    eventName: eventData.eventName,
                    startDate: new Date(eventData.startDate),
                    duration: eventData.duration,
                    location: eventData.location,
                    details: eventData.details,
                });
            } else {
                setFormData({
                    eventName: "",
                    startDate: new Date(),
                    duration: "",
                    location: "",
                    details: "",
                });
            }
        }, [eventData])
    );

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
            result.error.errors.forEach(err => {
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
            details: formData.details ?? "",
        });
        setFormData({
            eventName: "",
            startDate: new Date(),
            duration: "",
            location: "",
            details: "",
        });

        router.push(routersStrings.newOrder_packages3);
    };

    return (
        <View>
            {/* Nome do evento */}
            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Nome do evento</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    value={formData.eventName}
                    onChangeText={(value) => handleChange("eventName", value)}
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

            {/* Local */}
            <View className="mb-4">
                <Text className="text-sm font-semibold text-gray-800 mb-1">Local</Text>
                <TextInput
                    className="border border-gray-300 rounded-md px-3 py-2 bg-white"
                    value={formData.location}
                    onChangeText={(value) => handleChange("location", value)}
                />
                {errors.location && <Text className="text-red-500 text-xs mt-1">{errors.location}</Text>}
            </View>

            {/* Detalhes do evento */}
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
            </View>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Text
                        className="text-sm text-gray-500 text-center"
                    >
                        O que são os detalhes do evento?
                    </Text>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogTitle>Detalhes do Evento</AlertDialogTitle>
                    <AlertDialogText>No campo detalhes do evento, que você irá falar as alterações que deseja fazer no pacote, que serão analisadas pela nossa equipe.</AlertDialogText>
                </AlertDialogContent>
            </AlertDialog>

            {pack ? (
                <>
                    {modalVisible && (
                        <PackageDetailsModal visible={modalVisible} onClose={() => setModalVisible(false)} pack={pack} />
                    )}
                    <TouchableOpacity
                        className="mt-2 bg-[#5A5040] py-1 rounded-full flex-row items-center justify-center"
                        onPress={() => setModalVisible(true)}
                    >
                        <Text className="text-white font-bold">Conferir Pacote Selecionado</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text>Nenhum pacote selecionado.</Text>
            )}

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
