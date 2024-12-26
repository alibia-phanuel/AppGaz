import { Shadows } from "@/constants/Shadows";

import { View, ViewStyle, type ViewProps } from "react-native";
type Props = ViewProps;

export function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View style={[style, styles, { backgroundColor: "gray" }]} {...rest} />
  );
}

const styles = {
  borderRadius: 8,
  overflow: "hidden",
  ...Shadows.db2,
} satisfies ViewStyle;
function useThemeColors() {
  throw new Error("Function not implemented.");
}
