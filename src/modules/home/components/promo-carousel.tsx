import { routersStrings } from "@/modules/shared/utils/routers";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    Text,
    View,
    Animated,
    TouchableOpacity,
} from "react-native";

interface PromoProps {
    items: string[];
}

const { width } = Dimensions.get("window");

export const PromoTextCarousel = ({ items }: PromoProps) => {
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
        <View className="w-full mt-4 mb-6">
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
                className="h-[80px]"
            >
                {items.map((text, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => router.push(routersStrings.newOrder)}
                        className="items-center justify-center px-6 bg-[#5A5040] mx-4"
                        style={{ width: width * 0.92 }}
                    >
                        <Text className="text-center text-lg font-medium text-[#F7F6F3]">
                            {text}
                        </Text>
                    </TouchableOpacity>
                ))}
            </Animated.ScrollView>

            <View className="flex-row justify-center mt-2">
                {items.map((_, i) => {
                    const opacity = scrollX.interpolate({
                        inputRange: [(i - 1) * width, i * width, (i + 1) * width],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            key={i}
                            style={{
                                opacity,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginHorizontal: 4,
                                backgroundColor: "#000",
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
};
