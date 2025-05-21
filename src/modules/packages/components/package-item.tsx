import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Package } from '../../schema/Package';
import { PackageDetailsModal } from './package-details-modal';

interface PackageItemProps {
    pack: Package;
    isSelected: boolean;
    disabled: boolean;
    onSelect: (id: number) => void;
}

export const PackageItem = ({ pack, isSelected, disabled, onSelect }: PackageItemProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="bg-white p-5 mb-4 rounded-2xl shadow-xl border border-zinc-200">
            <Text className="text-xl font-semibold text-[#101820] mb-2">{pack.name}</Text>

            <View className="flex-row items-center mb-1">
                <FontAwesome5 name="glass-cheers" size={14} color="#101820" />
                <Text className="ml-2 text-sm text-zinc-700">{pack.event_type}</Text>
            </View>

            <View className="flex-row items-center mb-1">
                <FontAwesome5 name="users" size={14} color="#101820" />
                <Text className="ml-2 text-sm text-zinc-700">{pack.guest_count} convidados</Text>
            </View>

            <Text className="text-lg font-bold text-[#101820] mt-2">R$ {pack.price.toFixed(2)}</Text>

            <View className="flex flex-row space-x-2 mt-4">
                <TouchableOpacity
                    className="flex-1 px-4 py-2 bg-[#9D4815] rounded-xl items-center"
                    onPress={() => setModalVisible(true)}
                >
                    <Text className="text-white font-semibold">Ver Detalhes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 px-4 py-2 rounded-xl flex-row justify-center items-center ${isSelected
                        ? 'bg-green-600'
                        : disabled
                            ? 'bg-gray-300'
                            : 'bg-[#5A5040]'
                        }`}
                    onPress={() => onSelect(pack.id)}
                    disabled={disabled}
                >
                    {isSelected && (
                        <FontAwesome name="check" size={14} color="#fff" style={{ marginRight: 6 }} />
                    )}
                    <Text className="text-white font-semibold">
                        {isSelected ? 'Escolhido' : 'Escolher'}
                    </Text>
                </TouchableOpacity>
            </View>

            {modalVisible && (
                <PackageDetailsModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    pack={pack}
                />
            )}
        </View>
    );
};
