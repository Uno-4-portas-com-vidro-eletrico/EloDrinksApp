import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TokenData } from "../types/token";
import { useTokenStore } from "../store/useTokenStore";
import {API_KEY, BASE_URL, USER_SCOPE} from "@env";
import useToast from "@/modules/shared/hooks/useToast";

//const API_KEY: string = process.env.API_KEY || ""
//const BASE_URL: string = process.env.BASE_URL || "http://localhost:8000/"
//const USER_SCOPE: string = process.env.USER_SCOPE || ""

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

    const result = await fetch(`${BASE_URL}login/`, {
        method: "POST",
        headers: {
            Accept: 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-API-Key': API_KEY,
        },
        body: formBody.join("&")
    });
    
    if (result.status === 401) throw new Error("Email ou senha incorretos")

    if (!result.ok) throw new Error("Erro ao realizar login")

    const data: TokenData = await result.json()

    return data
}

export function useLogin() {
    const queryClient = useQueryClient();
    const setToken = useTokenStore(state => state.setToken);
    const showToast = useToast();

    return useMutation({
        mutationFn: async ({ email, password }: UserCredentials) => {
            const tokenData = await getTokenData({email, password});
            
            setToken(tokenData);

            return tokenData;
        },
        onSuccess: async () => await queryClient.invalidateQueries({ queryKey: ['token'] }),
        onError: (error: Error) => showToast("danger", error.message)
    })
}