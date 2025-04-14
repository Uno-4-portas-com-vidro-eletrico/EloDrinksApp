import type React from "react";
import type { ReactNode } from "react";
import { Text as RNText, type TextProps } from "react-native";

interface CustomTextProps extends TextProps {
	children?: ReactNode;
	weight?: "regular" | "medium" | "bold" | "semibold";
	size?: "sm" | "md" | "lg";
}

export const Heading: React.FC<CustomTextProps> = ({
	style,
	children,
	weight,
	size = "md",
	...otherProps
}) => {
	const sizeMap = { sm: 16, md: 20, lg: 24 };

	const styleWeight = {
		regular: "Poppins_400Regular",
		medium: "Poppins_500Medium",
		bold: "Poppins_700Bold",
		semibold: "Poppins_600SemiBold",
		light: "Poppins_300Light",
	};

	const customStyle = [
		{ fontFamily: styleWeight[weight || "regular"], fontSize: sizeMap[size] },
		style,
	];

	return (
		<RNText style={customStyle} {...otherProps}>
			{children}
		</RNText>
	);
};
