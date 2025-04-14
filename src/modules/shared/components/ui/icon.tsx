import { MaterialIcons } from "@expo/vector-icons";

interface IconProps {
	name: React.ComponentProps<typeof MaterialIcons>["name"];
	color?: string;
	size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, color, size, ...props }) => {
	return <MaterialIcons name={name} color={color} size={size} {...props} />;
};
