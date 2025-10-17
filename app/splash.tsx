import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get("window");

const splashScreens = [
  {
    icon: "cart-outline",
    title: "eVend",
    subtitle: "Your quick stop for refreshing drinks.",
    description: "Select your favorite drink from the menu.",
  },
  {
    icon: "card-outline",
    title: "eVend",
    subtitle: "Your quick stop for refreshing drinks.",
    description: "Pay easily using your wallet or card.",
  },
  {
    icon: "checkmark-circle-outline",
    title: "eVend",
    subtitle: "Your quick stop for refreshing drinks.",
    description: "Get an OTP to dispense your drink instantly!",
  },
];

export default function SplashScreen() {
  const [currentScreen, setCurrentScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % splashScreens.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleGetStarted = () => {
    router.push("/login");
  };

  const currentData = splashScreens[currentScreen];

  return (
    <View className="flex-1 bg-teal-500 justify-center items-center px-8">
      {/* Main Content */}
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-5xl font-bold mb-4">
          {currentData.title}
        </Text>
        <Text className="text-white text-lg text-center mb-16 opacity-90">
          {currentData.subtitle}
        </Text>

        {/* Icon */}
        <View className="mb-16">
          <Ionicons name={currentData.icon as any} size={120} color="white" />
        </View>

        {/* Description */}
        <Text className="text-white text-xl text-center font-extrabold mb-16 px-4">
          {currentData.description}
        </Text>
      </View>

      {/* Bottom Section */}
      <View className="mb-16">
        {/* Pagination Dots */}
        <View className="flex-row justify-center mb-8">
          {splashScreens.map((_, index) => (
            <View
              key={index}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentScreen ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          onPress={handleGetStarted}
          className="bg-white rounded-full px-12 py-4 shadow-lg"
          activeOpacity={0.8}
        >
          <Text className="text-teal-500 text-lg font-semibold text-center">
            GET STARTED
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
