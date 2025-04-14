import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { createContext, useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "./text";

interface RadioGroupContextType {
	value?: string;
	setValue: (value: string) => void;
	onValueChange?: (value: string) => void;
}
const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
	undefined,
);

interface RadioGroupProps {
	defaultValue: string;
	children: React.ReactNode;
	onValueChange?: (value: string) => void;
}
function RadioGroup({
	defaultValue,
	children,
	onValueChange,
}: RadioGroupProps) {
	const [value, setValue] = useState<string>();

	React.useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<RadioGroupContext.Provider value={{ value, setValue, onValueChange }}>
			{children}
		</RadioGroupContext.Provider>
	);
}

interface RadioGroupItemProps
	extends React.ComponentPropsWithoutRef<typeof Pressable> {
	value: string;
	label?: string;
	labelClasses?: string;
}
function RadioGroupItem({
	value,
	className,
	label,
	labelClasses,
	...props
}: RadioGroupItemProps) {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error("RadioGroupItem must be used within a RadioGroup");
	}
	const { value: selectedValue, setValue, onValueChange } = context;

	return (
		<Pressable
			onPress={() => {
				setValue(value);
				onValueChange?.(value);
			}}
			className={cn("flex flex-row items-center gap-2 my-1", className)}
			{...props}
		>
			{selectedValue === value ? (
				<View className="border-2 border-purple-500 p-[1px] rounded-full">
					<MaterialIcons
						name="radio-button-checked"
						size={20}
						color="#c164b8"
					/>
				</View>
			) : (
				<View className="border-2 border-zinc-400 p-[1px] rounded-full bg-white">
					<MaterialIcons
						name="radio-button-unchecked"
						size={20}
						color="#ccc"
					/>
				</View>
			)}
			{label && (
				<Text weight="regular" className={cn(labelClasses)}>
					{label}
				</Text>
			)}
		</Pressable>
	);
}

interface RadioGroupLabelProps
	extends React.ComponentPropsWithoutRef<typeof Pressable> {
	value: string;
}
function RadioGroupLabel({ value, className, ...props }: RadioGroupLabelProps) {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error("RadioGroupLabel must be used within a RadioGroup");
	}
	const { setValue, onValueChange } = context;

	return (
		<Pressable
			className={className}
			onPress={() => {
				setValue(value);
				onValueChange?.(value);
			}}
			{...props}
		/>
	);
}

export { RadioGroup, RadioGroupItem, RadioGroupLabel };
