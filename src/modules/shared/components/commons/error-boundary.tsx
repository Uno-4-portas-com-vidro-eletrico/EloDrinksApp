import { type ErrorBoundaryProps, router } from "expo-router";
import { View } from "react-native";
import { routersStrings } from "../../utils/routers";
import { Button } from "../ui/button";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";

export const ErrorBoundaryComponent: React.FC<any> = (
	props?: ErrorBoundaryProps,
) => {
	return (
		<View className="flex-1 w-full h-full px-4 items-center justify-center space-y-4">
			<Heading>Oops, tivemos um problema!</Heading>
			<Text>
				Ocorreu um erro desconhecido, confira sua conexão com a internet e tente
				novamente! Se o erro persistir, contate nosso suporte!
			</Text>
			<View className="flex-row items-center justify-between space-x-4">
				<Button
					size={"sm"}
					variant={"outline"}
					label="Tentar novamente"
					onPress={() => props?.retry()}
				/>
				<Button
					size={"sm"}
					label="Voltar para home"
					onPress={() => router.push(routersStrings.home)}
				/>
			</View>
		</View>
	);
};
