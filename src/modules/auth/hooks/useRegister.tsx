import { API_KEY, BASE_URL, USER_SCOPE } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData } from "../types/token";
import { useTokenStore } from "../store/useTokenStore";
import useToast from "@/modules/shared/hooks/useToast";

type UserCredentials = {
    name: string,
    email: string,
    telephone: string,
    password: string,
    confirmPassword: string
}

async function register(userCredentials: UserCredentials) {
    const result = await fetch(`${BASE_URL}register/?role=${USER_SCOPE}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY
        },
        body: JSON.stringify(userCredentials)
    });

    if (result.status === 400)
        throw new Error("'senha' e 'confirmar senha' precisam ser iguais")
    
    if (result.status === 409)
        throw new Error("Email já casdastrado")

    if (!result.ok)
        throw new Error("Erro ao realizar cadastro")

    const data: TokenData = await result.json();

    return data;
}

export function useRegister() {
    const queryClient = useQueryClient();
    const setToken = useTokenStore(state => state.setToken);
    const showToast = useToast();

    return useMutation({
        mutationFn: async (userCredentials: UserCredentials) => {
            const tokenData = await register(userCredentials);

            setToken(tokenData);

            return tokenData
        },
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['token'] }),
        onError: (error: Error) => showToast("danger", error.message)
    })
}