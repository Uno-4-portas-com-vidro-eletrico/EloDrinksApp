import { Stack } from "expo-router";
import { StatusBar } from "react-native";

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
    return (
        <>
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
        </>
    );
}
