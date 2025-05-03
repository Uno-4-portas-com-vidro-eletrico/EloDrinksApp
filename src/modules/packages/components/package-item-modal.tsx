import React, { useState } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface PackageItemModalProps {
    pack: any;
}

export const PackageItemModal = ({ pack }: PackageItemModalProps) => {

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
            //   onPress={() => abrirModal(item)}
            >
                <Text className="text-white font-bold">Ver Detalhes</Text>
            </TouchableOpacity>
        </View>
    );
}
