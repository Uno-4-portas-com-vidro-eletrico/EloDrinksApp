import { Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplashScreen, Stack } from "expo-router";
import { useCallback } from 'react';
import { StatusBar } from "react-native";
import FlashMessage from 'react-native-flash-message';

const queryClient = new QueryClient();

const MyStatusBar = () => (
    <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        networkActivityIndicatorVisible
        animated
    />
);

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <FlashMessage />
            <MyStatusBar />
            <Stack
                screenOptions={{
                    headerShown: false,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontFamily: "Poppins_400Regular",
                        fontSize: 18,
                    },
                    gestureEnabled: false,
                    contentStyle: {
                        backgroundColor: "#101820",
                    },
                }}
            >
                <Stack.Screen name="index" options={{ title: "Inicial" }} />
                <Stack.Screen name="auth/sign-in" options={{ title: "Entrar" }} />
                <Stack.Screen
                    name="auth/sign-up"
                    options={{ title: "Crie sua conta" }}
                />
                <Stack.Screen
                    name="auth/remember"
                    options={{ title: "Recuperar senha" }}
                />
            </Stack>
        </QueryClientProvider>
    );
}
