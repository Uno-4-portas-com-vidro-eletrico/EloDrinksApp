import { routersStrings } from "@/modules/shared/utils/routers";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    TouchableOpacity,
    View,
    Animated,
} from "react-native";

interface Banner {
    imageUrl: string;
    link: string;
}

interface BannerProps {
    items: Banner[];
}

const { width } = Dimensions.get("window");

export const Banners = ({ items }: BannerProps) => {
    const scrollViewRef = useRef<ScrollView | null>(null);
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (items.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex = (index + 1) % items.length;
            scrollViewRef.current?.scrollTo({
                x: nextIndex * width,
                animated: true,
            });
            setIndex(nextIndex);
        }, 4000);

        return () => clearInterval(interval);
    }, [index, items.length]);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setIndex(newIndex);
    };

    return (
        <View className="w-full mb-6">
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleScroll}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                className="h-[180px]"
            >
                {items.map((item, i) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        key={i}
                        className="items-center justify-center"
                        onPress={() => router.push(item.link)}
                        style={{ width }}
                    >
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={{
                                width: width * 0.92,
                                height: 170,
                                resizeMode: "cover",
                                borderRadius: 16,
                                marginHorizontal: width * 0.04,
                                backgroundColor: "#f3f3f3",
                            }}
                        />
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>

            {/* Paginação bonita */}
            <View className="flex-row justify-center mt-4">
                {items.map((_, i) => {
                    const opacity = scrollX.interpolate({
                        inputRange: [
                            (i - 1) * width,
                            i * width,
                            (i + 1) * width,
                        ],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                opacity,
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                marginHorizontal: 6,
                                backgroundColor: "#000",
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};
