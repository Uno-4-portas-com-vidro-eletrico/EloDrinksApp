import { Heading } from "@/modules/shared/components/ui/heading";
import { Text } from "@/modules/shared/components/ui/text";
import React from "react";
import { View, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { HeaderWithBack } from "@/modules/shared/components/commons/header-with-back";
import { FormSignIn } from "../forms/sign-in";

export const PageSignIn: React.FC = () => {

    return (
        <KeyboardAwareScrollView>
            <View>
                <View className="flex h-screen items-center border-box">
                    <HeaderWithBack />
                    <Image className="mb-10" source={require("@/assets/images/logo-full.png")} />
                    <View className="flex h-full p-4 bg-white w-full rounded-tl-3xl rounded-tr-3xl">
                        <View className="flex flex-col w-full items-start justify-start py-4">
                            <Heading>Entre na sua conta</Heading>
                            <Text className="text-md text-left text-zinc-500">
                                Bem-vinda de volta
                            </Text>
                        </View>
                        <FormSignIn />
                    </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};
