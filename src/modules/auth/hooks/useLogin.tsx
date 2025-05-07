import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData } from "../types/token";
import { useTokenStore } from "../store/useTokenStore";
import { USER_SCOPE } from "@env";
import useToast from "@/modules/shared/hooks/useToast";
import { apiFormURLencoded } from "@/libs/api";


type UserCredentials = {
    email: string,
    password: string
}

async function getTokenData({ email, password }: UserCredentials) {
    const details: Record<string, string> = {
        username: email,
        password: password,
        scope: USER_SCOPE
    };

    let formBody = [];

    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    const response = await apiFormURLencoded.post('/login', formBody.join("&"));

    if (response.status !== 200) throw new Error("Erro ao realizar login")

    const data: TokenData = response.data

    return data
}

export function useLogin() {
    const queryClient = useQueryClient();
    const setToken = useTokenStore(state => state.setToken);
    const showToast = useToast();

    return useMutation({
        mutationFn: async ({ email, password }: UserCredentials) => {
            const tokenData = await getTokenData({ email, password });

            setToken(tokenData);

            return tokenData;
        },
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['token'] }),
        onError: (error: Error) => {
            console.log("error.message:", error.message);
            showToast("danger", error.message)
        }
    })
}