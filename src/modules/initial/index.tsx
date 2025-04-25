import { router } from "expo-router";
import React from "react";
import { ScrollView, Dimensions, View, ViewStyle, Image } from "react-native";
import { Heading } from "../shared/components/ui/heading";
import { cn } from "../shared/utils/cn";
import { routersStrings } from "../shared/utils/routers";
import { Button } from "../shared/components/ui/button";

export default function HomeInital() {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const { width, height } = Dimensions.get("window");
    const [active, setActive] = React.useState(0);

    const carouselItems = [
        {
            url: "initial_slider_1.jpg",
            title: "Facilidade e Conforto",
            description:
                "O orçamento da sua festa na palma da sua mão",
        },
        // {
        //     url: "initial_slider_2.jpg",
        //     title: "Motivação e Carinho",
        //     description: "Treinos que te motivam e te fazem sorrir",
        // },
        // {
        //     url: "initial_slider_3.jpg",
        //     title: "Liberdade e Comunidade",
        //     description:
        //         "Femininas como você, nós te entendemos e pensamos em cada detalhe da sua jornada fitness",
        // },
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setActive((prevIndex) => {
                const nextIndex = (prevIndex + 1) % carouselItems.length;
                scrollViewRef?.current?.scrollTo({
                    x: nextIndex * width,
                    animated: true,
                });
                return nextIndex;
            });
        }, 4000);
        return () => clearInterval(interval);
    }, [carouselItems.length, width]);

    return (
        <>
            <View className="relative w-screen h-screen">
                <View className="absolute z-0 top-0 left-0 h-screen w-screen">
                    <ScrollView
                        ref={scrollViewRef}
                        className="bg-[#E0CEAA]"
                        pagingEnabled
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ width, height } as ViewStyle}
                    >
                        {/* <Image
                            source={require("@/assets/images/initial_slider_1.jpg")}
                            style={{ resizeMode: "cover" }}
                            className="w-screen h-screen"
                        />
                        <Image
                            source={require("@/assets/images/initial_slider_2.jpg")}
                            style={{ resizeMode: "cover" }}
                            className="w-screen h-screen"
                        />
                        <Image
                            source={require("@/assets/images/initial_slider_3.jpg")}
                            style={{ resizeMode: "cover" }}
                            className="w-screen h-screen"
                        /> */}
                    </ScrollView>
                </View>
                <View className="absolute z-0 w-full h-screen top-0 left-0 bg-black opacity-0" />
                <View className="absolute z-20 bg-transparent top-0 left-0 w-full h-full flex flex-col items-center justify-center box-border pb-4">
                    <View className="w-5/6 flex items-center justify-center px-10 py-4 rounded-2xl bg-white gap-4">
                        <View className="items-center gap-1">
                            <Image source={require("@/assets/images/logo-mini-black.png")} className="w-5 h-12" />
                            <Heading size="lg" className="text-[#101820] w-[220px] text-center">
                                {carouselItems[active]?.title}
                            </Heading>
                            <Heading size="sm" className="text-[#101820] w-[220px] text-center">
                                {carouselItems[active]?.description}
                            </Heading>
                        </View>
                        <View className="flex flex-row self-center space-x-2 py-4">
                            {carouselItems.map((i, k) => (
                                <View
                                    key={i.description}
                                    className={cn(
                                        "h-1 flex items-center justify-center rounded-xl",
                                        k === active ? "bg-[#101820] w-12" : "bg-zinc-500 w-4",
                                    )}
                                />
                            ))}
                        </View>
                        <View className="box-border w-full space-y-4 pb-4">
                            <Button
                                variant={"default"}
                                label="Entrar"
                                onPress={() => router.push(routersStrings.signin)}
                                block={"full"}
                            />
                            <Button
                                variant={"secondary"}
                                label="Criar Nova Conta"
                                block={"full"}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
}
