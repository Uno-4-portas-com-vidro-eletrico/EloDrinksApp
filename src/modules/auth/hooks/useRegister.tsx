import { USER_SCOPE } from "@env";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData } from "../types/token";
import { useTokenStore } from "../store/useTokenStore";
import useToast from "@/modules/shared/hooks/useToast";
import { api } from "@/libs/api";

type UserCredentials = {
    name: string,
    email: string,
    telephone: string,
    password: string,
    confirmPassword: string
}

async function getTokenData(userCredentials: UserCredentials) {
    const response = await api.post(`/register/?role=${USER_SCOPE}`, userCredentials);

    if (response.status !== 200)
        throw new Error("Erro ao realizar cadastro")

    const data: TokenData = response.data;

    return data;
}

export function useRegister() {
    const queryClient = useQueryClient();
    const setToken = useTokenStore(state => state.setToken);
    const showToast = useToast();

    return useMutation({
        mutationFn: async (userCredentials: UserCredentials) => {
            const tokenData = await getTokenData(userCredentials);

            setToken(tokenData);

            return tokenData
        },
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['token'] }),
        onError: (error: Error) => {
            showToast("danger", error.message)
        }
    })
}