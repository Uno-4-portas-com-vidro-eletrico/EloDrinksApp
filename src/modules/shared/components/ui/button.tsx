import { type VariantProps, cva } from "class-variance-authority";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { cn } from "../../utils/cn";
import { Text } from "./text";

const buttonVariants = cva(
	"flex flex-row items-center justify-center rounded-[32px] min-w-[64px] h-[52px] font-semibold space-x-2  ",
	{
		variants: {
			variant: {
				default: "bg-primary bg-[#9D4815]",
				secondary: "bg-secondary bg-[#cf6627]",
				outline: "border border-primary bg-transparent border-purple-500",
				outline_grayscale:
					"border border-primary bg-transparent border-zinc-300",
				destructive: "bg-destructive border border-zinc-200 px-8",
				ghost: "bg-trnasparent",
				link: "bg-transparent",
			},
			size: {
				default: "h-11 px-4",
				sm: "h-8 px-3",
				lg: "h-12 px-8",
			},
			block: {
				default: "w-autp",
				full: "w-full",
				link: "px-0",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			block: "default",
		},
	},
);

const buttonTextVariants = cva("text-center font-medium", {
	variants: {
		variant: {
			default: "text-primary-foreground text-white",
			secondary: "text-secondary-foreground text-white",
			destructive: "text-destructive-foreground",
			outline: "text-primary-foreground text-purple-500",
			outline_grayscale: "text-primary-foreground text-zinc-500",
			ghost: "text-purple-500",
			link: "text-purple-500",
		},
		size: {
			default: "text-sm",
			sm: "text-sm",
			lg: "text-xl",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

interface ButtonProps
	extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
	VariantProps<typeof buttonVariants> {
	label: string;
	labelClasses?: string;
	loading?: boolean;
	loadingText?: string;
	block?: "default" | "full" | "link" | null | undefined;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}
function Button({
	label,
	labelClasses,
	className,
	variant,
	size,
	leftIcon,
	rightIcon,
	block,
	loading,
	loadingText,
	...props
}: ButtonProps) {
	return (
		<TouchableOpacity
			className={cn(
				buttonVariants({ variant, size, block, className }),
				props.disabled || loading ? "opacity-70" : "",
			)}
			{...props}
		>
			{loading ? <ActivityIndicator size="small" color="#fff" /> : leftIcon}
			<Text
				className={cn(
					buttonTextVariants({ variant, size, className: labelClasses }),
					loading || leftIcon ? "pl-2" : "",
				)}
			>
				{loading ? loadingText : label}
			</Text>
			{loading ? null : rightIcon}
		</TouchableOpacity>
	);
}

export { Button, buttonTextVariants, buttonVariants };
