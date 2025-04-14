import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	type DimensionValue,
	Dimensions,
	StyleSheet,
	View,
} from "react-native";
import Animated, {
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
	w?: DimensionValue;
	h?: DimensionValue;
	rounded?: number;
	mr?: DimensionValue;
	mb?: DimensionValue;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const { width } = Dimensions.get("window");

export const Skeleton: React.FC<SkeletonProps> = ({
	w = 200,
	h = 100,
	rounded = 20,
	mr = 12,
	mb = 0,
}) => {
	const item = useSharedValue(0);

	React.useEffect(() => {
		item.value = withRepeat(withTiming(1, { duration: 2000 }), -1);
	}, []);

	const rStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: interpolate(item.value, [0, 1], [-width - 40, width]) },
			],
		};
	});

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.skeleton,
					{
						width: w,
						height: h,
						borderRadius: rounded,
						marginRight: mr,
						marginBottom: mb,
					},
				]}
			>
				<AnimatedLinearGradient
					colors={["#ddd", "#eee", "#ddd"]}
					style={[{ ...StyleSheet.absoluteFillObject }, rStyle]}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 0 }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	skeleton: {
		backgroundColor: "#ddd",
		overflow: "hidden",
	},
});
