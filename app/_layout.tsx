import { WalletProvider } from "@/context/WalletContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <WalletProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="inverted" />
    </WalletProvider>
  );
}
