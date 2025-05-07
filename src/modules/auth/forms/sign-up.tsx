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
import { useRegister } from "../hooks/useRegister";

const schema = z.object({
    name: z.string({ required_error: "Campo obrigatório" }).min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
    email: z.string({ required_error: "Campo obrigatório" }).email({ message: "Email inválido" }),
    phone: z.string({ required_error: "Campo obrigatório" }).min(10, { message: "Telefone inválido" }),
    password: z.string({ required_error: "Campo obrigatório" }).min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
    confirmPassword: z.string({ required_error: "Campo obrigatório" }).min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

type schemaType = z.infer<typeof schema>;

export const FormSignUp: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { mutateAsync: register, isPending } = useRegister()
    const showToast = useToast();

    const form = useForm({
        mode: "all",
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: schemaType) => {
        const { name, email, phone, password, confirmPassword } = data;
        console.log("Sign-up data", data);
        
        await register({ name, email, telephone: phone, password, confirmPassword });
        
        //router.replace(routersStrings.home);
    };

    const onError: SubmitErrorHandler<FieldValues> = (errors, e) => {
        showToast("danger", "Erro ao realizar cadastro");
    };

    return (
        <FormProvider {...form}>
            <View className="flex flex-col space-y-2">
                <View>
                    <Controller
                        control={form.control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon="person"
                                placeholder="Nome"
                                onChangeText={(text) => onChange(text)}
                                onBlur={onBlur}
                                error={form.formState.errors.name?.message}
                                value={value}
                            />
                        )}
                        name="name"
                    />
                </View>
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
                                keyboardType="phone-pad"
                                leftIcon="call"
                                placeholder="Telefone"
                                onChangeText={(text) => onChange(text)}
                                onBlur={onBlur}
                                error={form.formState.errors.phone?.message}
                                value={value}
                            />
                        )}
                        name="phone"
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
                <View>
                    <Controller
                        control={form.control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                leftIcon="lock-closed"
                                placeholder="Confirme a senha"
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => onChange(text)}
                                handleShowPassword={() => setShowPassword((prev) => !prev)}
                                onBlur={onBlur}
                                error={form.formState.errors.confirmPassword?.message}
                                value={value}
                            />
                        )}
                        name="confirmPassword"
                    />
                </View>
                <View>
                    <Button
                        label={"Cadastrar"}
                        onPress={() => form.handleSubmit(onSubmit, onError)()}
                        disabled={isPending}
                        loading={isPending}
                        loadingText="Aguarde..."
                    />
                </View>
                <View className="flex items-center">
                    <Text>Já tem uma conta?</Text>
                    <Link href={routersStrings.signin}>
                        <Text className="text-blue-700">Fazer login</Text>
                    </Link>
                </View>
            </View>
        </FormProvider>
    );
};