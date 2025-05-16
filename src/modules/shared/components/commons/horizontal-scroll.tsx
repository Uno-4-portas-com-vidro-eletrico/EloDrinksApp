import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Animated, type ScrollView, View } from "react-native";

interface HorizontalScrollProps {
    children?: React.ReactNode;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
    children,
}) => {
    const scrollViewRef = React.useRef<ScrollView>(null);
    const [showLeftArrow, setShowLeftArrow] = React.useState<boolean>(false);
    const [showRightArrow, setShowRightArrow] = React.useState<boolean>(true);

    const handleScroll = (event: any) => {
        const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;

        const scrollPosition = Math.round(contentOffset.x);
        const scrollWidth = Math.round(contentSize.width);
        const viewportWidth = Math.round(layoutMeasurement.width);

        const isAtStart = scrollPosition <= 10;
        const isAtEnd = scrollPosition + viewportWidth >= scrollWidth - 10;

        if (showLeftArrow !== !isAtStart) setShowLeftArrow(!isAtStart);
        if (showRightArrow !== !isAtEnd) setShowRightArrow(!isAtEnd);
    };

    return (
        <View className="relative flex-1">
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                className="flex-1"
            >
                <View className="flex-row items-center justify-stretch space-x-2">
                    {children}
                </View>
            </Animated.ScrollView>

            {showLeftArrow && (
                <LinearGradient
                    colors={["#ffffff", "#ffffff00"]}
                    start={{ x: -0.4, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="absolute left-0 top-0 h-full w-6 flex items-end justify-center"
                >
                    <Feather name="chevron-left" size={24} color="#9D4815" />
                </LinearGradient>
            )}

            {showRightArrow && (
                <LinearGradient
                    colors={["#ffffff00", "#ffffff"]}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 1.2, y: 0 }}
                    className="absolute right-0 top-0 h-full w-6 flex items-start justify-center"
                >
                    <Feather name="chevron-right" size={24} color="#9D4815" />
                </LinearGradient>
            )}
        </View>
    );
};
