import { ErrorBoundaryComponent } from "@/modules/shared/components/commons/error-boundary";
import { IconHeaderDefault } from "@/modules/shared/components/commons/icon-header-default";
import { type ErrorBoundaryProps, Tabs } from "expo-router";
import React from "react";
import { Host } from "react-native-portalize";
import { Image, TouchableOpacity } from "react-native";
import { DrawerToggleButton } from "@react-navigation/drawer";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from "@expo/vector-icons/Ionicons";
import { cn } from "@/modules/shared/utils/cn";
import { BtnBackHeader } from "@/modules/shared/components/commons/btn-back-button";

export function ErrorBoundary(props: ErrorBoundaryProps) {
    return <ErrorBoundaryComponent {...props} />;
}

export default function Layout() {
    return (
        <>
            <Host>
                <Tabs
                    screenOptions={{
                        lazy: true,
                        headerShown: true,
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontFamily: "Inter_700Bold",
                            fontSize: 20,
                            color: '#F7F6F3'
                        },
                        headerStyle: {
                            backgroundColor: "#9D4815"
                        },
                        tabBarActiveTintColor: "#101820",
                        tabBarInactiveTintColor: "#F7F6F3",
                        tabBarLabelStyle: {
                            fontFamily: "Poppins_400Regular",
                            fontSize: 11,
                            marginTop: 8,
                            position: "absolute",
                            top: 32,
                        },
                        tabBarIconStyle: {
                            position: "absolute",
                            top: 18,
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarStyle: {
                            elevation: 5,
                            height: 72,
                            paddingVertical: 8,
                            backgroundColor: "#9D4815",
                        },
                        headerLeft: () => <DrawerToggleButton tintColor="#F7F6F3" />,
                        headerRight: () => <IconHeaderDefault />,
                    }}
                    initialRouteName="home/index"
                >
                    <Tabs.Screen
                        name="home/index"
                        options={{
                            title: "Home",
                            headerTitle: () => (
                                <Image
                                    source={require("@/assets/images/logo.png")}
                                    resizeMode="contain"
                                    style={{ marginRight: 16, width: 192, height: 48 }}
                                />
                            ),
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <FontAwesome5
                                    name="home"
                                    size={20}
                                    color={focused ? "#000" : "#fff"}
                                />
                            ),
                            headerRight: () => null,
                        }}
                    />
                    <Tabs.Screen
                        name="notifications/index"
                        options={{
                            title: "Notificações",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <Ionicons
                                    name="notifications"
                                    size={24}
                                    color={focused ? "#101820" : "#fff"}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="new-order/index"
                        options={{
                            title: "Novo pedido",
                            tabBarButton: (props) => (
                                <TouchableOpacity
                                    onPress={(event) => props.onPress?.(event)}
                                    className={cn(
                                        "top-[-20px] w-16 h-16 rounded-full bg-[#F7F6F3]",
                                        "justify-center items-center shadow-md self-center"
                                    )}
                                    style={{
                                        shadowColor: "#000",
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.25,
                                        shadowRadius: 3.84,
                                        elevation: 5,
                                    }}
                                >
                                    <FontAwesome5 name="plus" size={24} color="#9D4815" />
                                </TouchableOpacity>
                            ),
                            headerLeft: () => <BtnBackHeader confirmBack={true} />,
                        }}
                    />
                    <Tabs.Screen
                        name="history/index"
                        options={{
                            title: "Histórico",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <FontAwesome5
                                    name="history"
                                    size={20}
                                    color={focused ? "#101820" : "#fff"}
                                />
                            ),
                        }}
                    />
                    <Tabs.Screen
                        name="profile/index"
                        options={{
                            title: "Perfil",
                            tabBarIcon: ({ focused }: { focused: boolean }) => (
                                <Ionicons
                                    name="person"
                                    size={20}
                                    color={focused ? "#000" : "#fff"}
                                />
                            )
                        }}
                    />
                    <Tabs.Screen
                        name="new-order/second/index"
                        options={{
                            title: "Novo pedido",
                            headerLeft: () => <BtnBackHeader confirmBack={true} />,
                            href: null,
                        }}
                    />
                    <Tabs.Screen
                        name="new-order/packages/index"
                        options={{
                            title: "Pacotes",
                            headerLeft: () => <BtnBackHeader confirmBack={true} />,
                            href: null,
                        }}
                    />
                    <Tabs.Screen
                        name="new-order/full-order/index"
                        options={{
                            title: "Orçamento",
                            headerLeft: () => <BtnBackHeader confirmBack={true} />,
                            href: null,
                        }}
                    />
                </Tabs>
            </Host>
        </>
    );
}
