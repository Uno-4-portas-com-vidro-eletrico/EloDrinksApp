import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import { useUserStore } from '@/modules/auth/store/useUser';
import { Field } from '@/modules/profile/components/field';
import { ScrollView } from 'react-native-gesture-handler';

const PageProfile = () => {
    const { user } = useUserStore();
    const [modalVisible, setModalVisible] = useState(false);

    const openSite = () => {
        Linking.openURL('https://elodrinks.com.br');
        setModalVisible(false);
    };

    const openEmail = () => {
        Linking.openURL('contato@elodrinks.com');
        setModalVisible(false);
    };

    return (
        <ScrollView className="bg-[#F7F6F3] rounded-3xl px-6 py-6 mx-4 mt-6 shadow-md flex-1">
            <Text className="text-2xl font-bold text-[#3A2F25] mb-6 text-center">Perfil do Usuário</Text>

            {user && (
                <>
                    <Field label="Nome" value={user.name} />
                    <Field label="Email" value={user.email} />
                    <Field label="Telefone" value={user.telephone} />
                </>
            )}

            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="mt-6 bg-[#A85D2D] py-4 rounded-2xl items-center"
            >
                <Text className="text-white font-bold text-base">Entrar em contato</Text>
            </TouchableOpacity>

            <Modal
                transparent
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-10">
                    <View className="bg-white rounded-2xl p-6 w-full shadow-lg">
                        <Text className="text-lg font-semibold text-center mb-4 text-[#3A2F25]">
                            Como deseja entrar em contato?
                        </Text>

                        <TouchableOpacity
                            onPress={openSite}
                            className="bg-[#A85D2D] py-3 rounded-xl mb-3"
                        >
                            <Text className="text-white text-center font-bold">Acessar site</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={openEmail}
                            className="bg-[#7B6A58] py-3 rounded-xl"
                        >
                            <Text className="text-white text-center font-bold">Enviar e-mail</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-4">
                            <Text className="text-center text-[#A85D2D] font-semibold">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default PageProfile;
