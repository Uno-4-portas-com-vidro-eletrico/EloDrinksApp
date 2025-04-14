import type React from "react";
import type { ReactNode } from "react";
import { Dimensions, Text as RNText, type TextProps } from "react-native";

interface CustomTextProps extends TextProps {
	children?: ReactNode;
	weight?: "regular" | "medium" | "bold" | "semibold" | "light";
}

export const { fontScale } = Dimensions.get("window");

export const isLargeFontScale = fontScale > 1;

export const Text: React.FC<CustomTextProps> = ({
	style,
	children,
	weight,
	...otherProps
}) => {
	const styleWeight = {
		regular: "Poppins_400Regular",
		medium: "Poppins_500Medium",
		bold: "Poppins_700Bold",
		semibold: "Poppins_600SemiBold",
		light: "Poppins_300Light",
	};

	const customStyle = [
		{
			fontFamily: styleWeight[weight || "regular"],
			fontSize: isLargeFontScale ? 16 : 14,
		},
		{ letterSpacing: 0.5 },
		style,
	];

	return (
		<RNText maxFontSizeMultiplier={1.1} style={customStyle} {...otherProps}>
			{children}
		</RNText>
	);
};
