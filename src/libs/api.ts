import { useTokenStore } from "@/modules/auth/store/useTokenStore";
import { routersStrings } from "@/modules/shared/utils/routers";
import { API_KEY, BASE_URL } from "@env";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

const protectedRoutes = [
    "/customer",
    "/structure",
    "/product",
    "/packs",
    "/sales",
];

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY,
    },
});

export const apiFormURLencoded = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-API-Key': API_KEY,
    },
});

const attachToken = (request: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = useTokenStore.getState().tokenData;

    if (token && request.headers) {
        request.headers.Authorization = `Bearer ${token.access_token}`;
    }

    return request;
};

const handleResponseError = (error: AxiosError) => {
    const resetToken = useTokenStore.getState().resetToken;

    const requestUrl = error.config?.url;

    const isProtectedRoute = requestUrl
        ? protectedRoutes.some(route => requestUrl.includes(route))
        : false;

    if (requestUrl?.includes("/login") && error.response?.status === 401)
        throw new Error("Email ou senha incorretos")

    if (requestUrl?.includes("/register") && error.response?.status === 400)
        throw new Error("'senha' e 'confirmarSenha' estão diferentes")

    if (requestUrl?.includes("/register") && error.response?.status === 409)
        throw new Error("Email já cadastrado")

    if (isProtectedRoute && error.response?.status === 401) {
        resetToken();
        router.replace(routersStrings.signin);
    }

    return Promise.reject(error);
};

api.interceptors.request.use(attachToken)
api.interceptors.response.use(res => res, handleResponseError)

apiFormURLencoded.interceptors.request.use(attachToken)
apiFormURLencoded.interceptors.response.use(res => res, handleResponseError)