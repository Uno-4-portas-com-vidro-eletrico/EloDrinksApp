import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesome5 } from '@expo/vector-icons';

interface PackageItemProps {
    pack: any;
}

export const PackageItem = ({ pack }: PackageItemProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="bg-[#F7F6F3] p-4 mb-4 rounded-2xl shadow-2xl border-[0.1px]">
            <Text className="text-lg font-semibold text-[#101820]">{pack.name}</Text>

            <View className="flex-row items-center">
                <FontAwesome5 name="glass-cheers" size={14} color="#101820" />
                <Text className="ml-1 text-sm text-zinc-600">{pack.type}</Text>
            </View>

            <View className="flex-row items-center mt-1">
                <FontAwesome5 name="users" size={14} color="#101820" />
                <Text className="ml-1 text-sm text-zinc-600">{pack.guests} convidados</Text>
            </View>

            <Text className="text-base font-bold text-[#101820] mt-2">R$ {pack.price.toFixed(2)}</Text>
            <TouchableOpacity
                className="mt-3 px-4 bg-[#9D4815] rounded-xl py-2 packs-center"
                onPress={() => setModalVisible(true)}
            >
                <Text className="text-white font-bold">Ver Detalhes</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <View className="bg-white p-6 rounded-2xl w-4/5">
                        <Text className="text-lg font-bold text-[#101820] mb-4">{pack.name}</Text>
                        <Text className="text-sm text-zinc-600 mb-2">Tipo: {pack.type}</Text>
                        <Text className="text-sm text-zinc-600 mb-2">Convidados: {pack.guests}</Text>
                        <Text className="text-base font-bold text-[#101820] mb-4">R$ {pack.price.toFixed(2)}</Text>
                        <Text className="text-sm text-zinc-600">{pack.description}</Text>

                        <TouchableOpacity
                            className="mt-4 px-4 bg-[#9D4815] rounded-xl py-2"
                            onPress={() => setModalVisible(false)}
                        >
                            <Text className="text-white font-bold text-center">Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
