import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "./text";

// TODO: make controlled (optional)
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof View> {
	label?: string;
	labelClasses?: string;
	checkboxClasses?: string;
	onChange?: (checked: string) => void;
	checked?: boolean;
}

function Checkbox({
	label,
	labelClasses,
	checkboxClasses,
	className,
	onChange,
	checked = false,
	...props
}: CheckboxProps) {
	const [isChecked, setChecked] = useState(checked);

	const toggleCheckbox = () => {
		setChecked((prev) => !prev);
		onChange?.(props?.id as string);
	};

	return (
		<View className={cn("my-1", className)} {...props}>
			<Pressable
				onPress={toggleCheckbox}
				className="flex flex-row items-center gap-2"
			>
				<View
					className={cn(
						"w-6 h-6 border-2 border-zinc-400 rounded-lg bg-background flex justify-center items-center p-1",
						{
							"bg-purple-500 border-purple-500 p-[2px]": isChecked,
						},
						checkboxClasses,
					)}
				>
					{isChecked && (
						<MaterialIcons name="check" size={16} color="#fff" />
					)}
				</View>
				{label && <Text className={cn(labelClasses)}>{label}</Text>}
			</Pressable>
		</View>
	);
}

export { Checkbox };
