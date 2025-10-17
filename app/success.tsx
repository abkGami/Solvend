import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";

interface SuccessScreenProps {
  otp: string;
}

export default function SuccessScreen() {
  const otp = "4599"; // This would normally come from the purchase process

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(otp);
  };

  return (
    <View className="flex-1 bg-teal-500 px-4 justify-center items-center">
      <View className="bg-white/20 rounded-3xl p-8 w-full max-w-sm items-center">
        <Text className="text-white text-2xl font-bold mb-2">Payment Successful!</Text>
        <Text className="text-white/80 mb-6">Your One-Time Password is</Text>
        
        <View className="flex-row space-x-2 mb-4">
          {otp.split("").map((digit, index) => (
            <View key={index} className="w-12 h-12 bg-white rounded-xl justify-center items-center">
              <Text className="text-teal-500 text-2xl font-bold">{digit}</Text>
            </View>
          ))}
          <TouchableOpacity 
            className="w-12 h-12 bg-white/20 rounded-xl justify-center items-center"
            onPress={copyToClipboard}
          >
            <Ionicons name="copy-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        <Text className="text-white/80 text-center text-sm mb-6">
          Enter this code on the vending machine.
        </Text>

        <View className="w-full space-y-3">
          <TouchableOpacity 
            className="bg-white/20 w-full rounded-xl py-3"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-white text-center font-medium">Save as Image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white w-full rounded-xl py-3"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-teal-500 text-center font-medium">Order Another Drink</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}