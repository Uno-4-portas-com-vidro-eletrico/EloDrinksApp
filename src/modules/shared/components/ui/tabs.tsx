import { createContext, useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import type React from "react";
import { cn } from "../../utils/cn";
import { Text } from "./text";

interface TabsContextProps {
	activeTab: string;
	setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextProps>({
	activeTab: "",
	setActiveTab: () => { },
});

interface TabsProps {
	defaultValue: string;
	children: React.ReactNode;
}
function Tabs({ defaultValue, children }: TabsProps) {
	const [activeTab, setActiveTab] = useState(defaultValue);
	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			{children}
		</TabsContext.Provider>
	);
}

function TabsList({
	className,
	...props
}: React.ComponentPropsWithoutRef<typeof View>) {
	return (
		<View
			className={cn("flex-row w-full justify-between bg-transparent", className)}
			{...props}
		/>
	);
}

interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof Pressable> {
	value: string;
	title: string | React.ReactNode;
	icon?: React.ComponentProps<typeof MaterialIcons>["name"];
	textClasses?: string;
}
function TabsTrigger({
	value,
	title,
	icon,
	className,
	textClasses,
	...props
}: TabsTriggerProps) {
	const { activeTab, setActiveTab } = useContext(TabsContext);
	const isActive = activeTab === value;

	return (
		<Pressable
			onPress={() => setActiveTab(value)}
			className={cn(
				"flex-1 py-3 mx-1 items-center rounded-t-xl border-b-[3px]",
				isActive
					? "border-[#FF7A00] bg-[#FFF5F0]"
					: "border-transparent bg-white",
				className
			)}
			{...props}
		>
			<View className="flex-row items-center space-x-2">
				{icon && (
					<MaterialIcons
						name={icon}
						size={20}
						color={isActive ? "#FF7A00" : "#A1A1AA"}
					/>
				)}
				{typeof title === "string" ? (
					<Text
						className={cn(
							"text-sm font-medium",
							isActive ? "text-[#FF7A00]" : "text-gray-500",
							textClasses
						)}
					>
						{title}
					</Text>
				) : (
					title
				)}
			</View>
		</Pressable>
	);
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
	value: string;
}
function TabsContent({ value, className, ...props }: TabsContentProps) {
	const { activeTab } = useContext(TabsContext);
	if (value !== activeTab) return null;
	return <View className={cn("mt-4", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
