import { Eye, EyeOff, TriangleAlert, type icons } from "lucide-react-native";
import { forwardRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { cn } from "../../utils/cn";
import { Icon } from "./icon";

export interface InputProps
	extends React.ComponentPropsWithoutRef<typeof TextInput> {
	label?: string;
	labelClasses?: string;
	inputClasses?: string;
	error?: any;
	leftIcon?: keyof typeof icons;
	handleShowPassword?: () => void;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
	(
		{ className, label, labelClasses, inputClasses, error, leftIcon, ...props },
		ref,
	) => (
		<View className={cn("flex flex-col", className)}>
			{label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
			<View className="relative flex items-center w-full">
				{leftIcon && (
					<View className="absolute left-4 top-3">
						<Icon
							name={leftIcon}
							size={20}
							className="text-white"
							fill={"#aaa"}
						/>
					</View>
				)}
				<TextInput
					className={cn(
						inputClasses,
						"border w-full relative z-0 border-input py-3 px-4 rounded-[16px] focus:outline-red-300 focus:outline-1",
						error ? "border-red-500" : "border-zinc-200",
						leftIcon ? "pl-10" : "pl-4",
						error ? "pr-10" : "pr-4",
					)}
					style={{ fontFamily: "Poppins_400Regular" }}
					{...props}
				/>
				{props.handleShowPassword && (
					<Pressable
						className="absolute z-10 right-10 top-[-3px] w-16 h-14 items-center justify-center"
						onPress={props.handleShowPassword}
					>
						{props.secureTextEntry ? (
							<EyeOff size={20} className="text-zinc-500" />
						) : (
							<Eye size={20} className="text-zinc-500" />
						)}
					</Pressable>
				)}
				{error && (
					<View className="absolute z-10 right-4 top-3 items-center justify-center">
						<TriangleAlert size={20} className="text-white" fill={"#F04438"} />
					</View>
				)}
			</View>
			{error && (
				<Text
					className="text-xs text-red-500"
					style={{ fontFamily: "Poppins_400Regular" }}
				>
					{error}
				</Text>
			)}
		</View>
	),
);

export { Input };
