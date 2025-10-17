import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRESET_AMOUNTS = [
  { value: 500, label: "₦500" },
  { value: 1000, label: "₦1000" },
  { value: 2000, label: "₦2000" },
  { value: 3000, label: "₦3000" },
  { value: 5000, label: "₦5000" },
  { value: 10000, label: "₦10000" },
];

export default function TopUpScreen() {
  const [amount, setAmount] = useState(0);

  const handleAmountSelect = (value: number) => {
    setAmount(value);
  };

  const handleTopUp = () => {
    // Handle top up logic here
    console.log('Processing top up for:', amount);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="bg-teal-500 px-4 py-4 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-medium">Top Up Wallet</Text>
      </View>

      <View className="flex-1 px-4 pt-8">
        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row items-center mb-6">
            <Ionicons name="wallet-outline" size={24} color="#4DB6AC" />
            <Text className="text-gray-800 text-lg font-medium ml-2">Enter Amount</Text>
          </View>

          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-gray-400 text-sm mb-1">₦</Text>
            <Text className="text-3xl font-bold text-gray-800">
              {amount.toFixed(2)}
            </Text>
          </View>

          <View className="flex-row flex-wrap justify-between">
            {PRESET_AMOUNTS.map((preset) => (
              <TouchableOpacity
                key={preset.value}
                className={`w-[31%] rounded-xl py-3 mb-4 ${amount === preset.value ? 'bg-teal-500' : 'bg-gray-100'}`}
                onPress={() => handleAmountSelect(preset.value)}
              >
                <Text
                  className={`text-center font-medium ${amount === preset.value ? 'text-white' : 'text-gray-800'}`}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className={`w-full rounded-xl py-4 mt-4 ${amount > 0 ? 'bg-teal-500' : 'bg-gray-200'}`}
            onPress={handleTopUp}
            disabled={amount === 0}
          >
            <Text className={`text-center font-medium ${amount > 0 ? 'text-white' : 'text-gray-400'}`}>
              Top Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}