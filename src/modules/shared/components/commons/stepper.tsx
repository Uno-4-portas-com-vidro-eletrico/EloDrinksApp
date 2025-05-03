import { cn } from "@/modules/shared/utils/cn";
import { View, Text } from "react-native";

export function Stepper({ currentStep = 1, totalSteps = 3 }) {
  return (
    <View className="flex-row items-center justify-center mt-4">
      {[...Array(totalSteps)].map((_, i) => {
        const step = i + 1;
        const isActive = currentStep === step;

        return (
          <View key={i} className="flex-row items-center mt-1 mb-4">
            <View
              className={cn(
                "w-9 h-9 rounded-full items-center justify-center border",
                isActive
                  ? "bg-[#E0CEAA] border-[#9D4815]"
                  : "bg-zinc-200 border-zinc-400"
              )}
            >
              <Text
                className={cn(
                  "text-xs font-medium",
                  isActive ? "text-orange-500" : "text-black"
                )}
              >
                {step}
              </Text>
            </View>

            {step !== totalSteps && (
              <View className="w-12 h-1 bg-zinc-400 mx-1" />
            )}
          </View>
        );
      })}
    </View>
  );
}
