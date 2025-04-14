import { type TypeIcon, icons } from "lucide-react-native";

interface IconProps extends React.ComponentPropsWithoutRef<typeof TypeIcon> {
	name: keyof typeof icons;
	color?: string;
	size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, color, size, ...props }) => {
	const LucideIcon = icons[name];
	return <LucideIcon color={color} size={size} {...props} />;
};
