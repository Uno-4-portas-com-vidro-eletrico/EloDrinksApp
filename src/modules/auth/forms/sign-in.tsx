import { Button } from "@/modules/shared/components/ui/button";
import { Input } from "@/modules/shared/components/ui/input";
import { Text } from "@/modules/shared/components/ui/text";
import { Link, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, FormProvider, SubmitErrorHandler, useForm } from "react-hook-form";
import useToast from "@/modules/shared/hooks/useToast";
import { routersStrings } from "@/modules/shared/utils/routers";
import { useLogin } from "../hooks/useLogin";

const schema = z.object({
    email: z.string({ required_error: "Campo obrigatório" }).email({
        message: "Email inválido",
    }),
    password: z.string({ required_error: "Campo obrigatório" })
        .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type schemaType = z.infer<typeof schema>;

export const FormSignIn: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { mutateAsync: login, isPending } = useLogin();
    const showToast = useToast();

    const form = useForm({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: schemaType) => {
        const { email, password } = data;
        console.log("Login data", data);
        const tokenData = await login({ email, password });
        console.log("sign-in | tokenData:", tokenData);

        router.push(routersStrings.home)
    };

    const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
        showToast("danger", "Erro ao realizar login");
    };

    return (
        <FormProvider {...form}>
            <View className="flex flex-col space-y-2">
                <View>
                    <Controller
                        control={form.control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                keyboardType="email-address"
                                leftIcon="mail"
                                placeholder="E-mail"
                                onChangeText={(text) => onChange(text)}
                                onBlur={onBlur}
                                error={form.formState.errors.email?.message}
                                value={value}
                            />
                        )}
                        name="email"
                    />
                </View>
                <View>
                    <Controller
                        control={form.control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon="lock-closed"
                                placeholder="Senha"
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => onChange(text)}
                                handleShowPassword={() => setShowPassword((prev) => !prev)}
                                onBlur={onBlur}
                                error={form.formState.errors.password?.message}
                                value={value}
                            />
                        )}
                        name="password"
                    />
                </View>

                <View className="items-end justify-center">
                    <Link
                        href={routersStrings.home}
                    >
                        <Text className="text-blue-700">Esqueci minha senha</Text>
                    </Link>
                </View>

                <View>
                    <Button
                        label={"Entrar"}
                        onPress={() => form.handleSubmit(onSubmit, onError)()}
                        disabled={isPending}
                        loading={isPending}
                        loadingText="Aguarde..."
                    />
                </View>
                <View className="flex items-center">
                    <Text>Ainda não tem uma conta?</Text>
                    <Link
                        href={"#"}>
                        <Text className="text-blue-700">Crie sua conta</Text>
                    </Link>
                </View>
            </View>
        </FormProvider>
    );
};