import { createContext, useContext, useState } from "react";
import { Pressable, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Importing MaterialIcons from expo-vector-icons
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
			className={cn(
				"flex-1 w-full flex-row justify-between space-x-2",
				className,
			)}
			{...props}
		/>
	);
}

interface TabsTriggerProps
	extends React.ComponentPropsWithoutRef<typeof Pressable> {
	value: string;
	title: string | React.ReactNode;
	icon?: React.ComponentProps<typeof MaterialIcons>["name"]; // Adjusted for MaterialIcons
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

	return (
		<Pressable
			className={cn(
				"flex-1 px-8 py-3 rounded-lg bg-muted items-center border",
				{
					"bg-foreground border-purple-500 bg-purple-50": activeTab === value,
					"border-zinc-300 bg-white": activeTab !== value,
					className,
				},
			)}
			onPress={() => setActiveTab(value)}
			{...props}
		>
			{typeof title === "string" ? (
				<View className="text-inherit flex-row space-x-2 items-center">
					{icon && (
						<MaterialIcons
							name={icon}
							size={24}
							color={activeTab === value ? "#7C3AED" : "#A1A1AA"} // Adjusted colors
						/>
					)}
					<Text
						className={cn(
							"text-center flex-row items-center space-x-2",
							{ "text-purple-500 ": activeTab === value },
							textClasses,
						)}
					>
						{title}
					</Text>
				</View>
			) : (
				title
			)}
		</Pressable>
	);
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
	value: string;
}
function TabsContent({ value, className, ...props }: TabsContentProps) {
	const { activeTab } = useContext(TabsContext);

	if (value === activeTab)
		return <View className={cn("mt-1", className)} {...props} />;

	return null;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
