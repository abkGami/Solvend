import images from "@/constants/images";
import { useWallet } from "@/context/WalletContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";

interface DrinkItem {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType;
}

const drinks: DrinkItem[] = [
  {
    id: "1",
    name: "Classic Cola",
    price: 200,
    image: images.cola,
  },
  {
    id: "2",
    name: "Orange Fizz",
    price: 180,
    image: images.fizz,
  },
  {
    id: "3",
    name: "Lemon Splash",
    price: 180,
    image: images.lemon,
  },
  {
    id: "4",
    name: "Power Energy",
    price: 300,
    image: images.energy,
  },
  {
    id: "5",
    name: "Blue Cola",
    price: 200,
    image: images.pepsi,
  },
  {
    id: "6",
    name: "Golden Malt",
    price: 250,
    image: images.maltina,
  },
];

import { Transaction } from "@/context/WalletContext";

export default function HomeScreen() {
  const [selectedDrink, setSelectedDrink] = useState<DrinkItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const { balance, transactions, deductFunds } = useWallet();

  const handleDrinkSelect = (drink: DrinkItem) => {
    setSelectedDrink(drink);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDrink(null);
  };

  const handlePayFromWallet = () => {
    if (selectedDrink && balance >= selectedDrink.price) {
      setShowPinModal(true);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedDrink && pin.length === 4) {
      const success = deductFunds(selectedDrink.price, `${selectedDrink.name} Purchase`);
      if (success) {
        setShowModal(false);
        setShowPinModal(false);
        setPin("");
        router.push("/success");
      }
    }
  };

  const renderTransactionItem = (transaction: Transaction) => {
    const isCredit = transaction.type === "credit";
    return (
      <View key={transaction.id} className="flex-row items-center justify-between bg-white rounded-xl p-4 shadow-sm mb-3">
        <View className="flex-row items-center">
          <View className={`w-10 h-10 rounded-full justify-center items-center mr-3 ${isCredit ? 'bg-green-100' : 'bg-red-100'}`}>
            <Ionicons 
              name={isCredit ? "arrow-up" : "arrow-down"} 
              size={20} 
              color={isCredit ? '#10B981' : '#EF4444'} 
            />
          </View>
          <View>
            <Text className="text-gray-800 font-medium">{transaction.description}</Text>
            <Text className="text-gray-500 text-sm">
              {transaction.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </Text>
          </View>
        </View>
        <Text className={`font-medium ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
          {isCredit ? '+' : '-'}₦{transaction.amount.toFixed(2)}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <StatusBar backgroundColor="#4DB6AC" />
      <View className="bg-teal-500 px-4 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-8 h-8 bg-white rounded-full justify-center items-center mr-2">
            <Ionicons name="person-outline" size={20} color="#4DB6AC" />
          </View>
          <Text className="text-white text-lg">Hello, abk!</Text>
        </View>
      </View>
      {/* Purchase Confirmation Modal */}
      <Modal
        visible={showModal && !showPinModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full rounded-2xl p-6">
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={closeModal}
            >
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
            <Text className="text-xl font-medium text-center mb-4">
              Confirm Purchase
            </Text>
            {selectedDrink && (
              <>
                <Text className="text-lg text-center text-gray-800 mb-1">
                  {selectedDrink.name}
                </Text>
                <Text className="text-2xl font-bold text-center text-teal-500 mb-2">
                  ₦ {selectedDrink.price.toFixed(2)}
                </Text>
                <Text className="text-sm text-center text-gray-500 mb-4">
                  Wallet Balance: ₦{balance.toFixed(2)}
                </Text>
                {balance >= selectedDrink.price ? (
                  <TouchableOpacity
                    className="bg-teal-500 w-full rounded-xl py-3 mb-2"
                    onPress={handlePayFromWallet}
                  >
                    <Text className="text-white text-center font-medium">
                      Pay from Wallet
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="bg-teal-100 w-full rounded-xl py-3 mb-2"
                    onPress={closeModal}
                  >
                    <Text className="text-teal-500 text-center font-medium">
                      Insufficient Balance
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  className="bg-gray-100 w-full rounded-xl py-3"
                  onPress={closeModal}
                >
                  <Text className="text-gray-800 text-center font-medium">
                    Pay with Card
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* PIN Verification Modal */}
      <Modal
        visible={showPinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPinModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white w-full rounded-2xl p-6">
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPinModal(false)}
            >
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
            <Text className="text-xl font-medium text-center mb-2">
              Enter your PIN
            </Text>
            <Text className="text-sm text-center text-gray-500 mb-6">
              Confirm your payment by entering your 4-digit PIN
            </Text>
            
            <View className="mb-6">
              <TextInput
                className="bg-gray-100 rounded-xl p-4 text-center text-2xl tracking-widest"
                maxLength={4}
                keyboardType="numeric"
                secureTextEntry
                value={pin}
                onChangeText={setPin}
                placeholder="****"
              />
            </View>

            <TouchableOpacity
              className={`w-full rounded-xl py-3 mb-3 ${pin.length === 4 ? 'bg-teal-500' : 'bg-gray-200'}`}
              onPress={handleConfirmPayment}
              disabled={pin.length !== 4}
            >
              <Text className={`text-center font-medium ${pin.length === 4 ? 'text-white' : 'text-gray-400'}`}>
                Confirm Payment
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="flex-row justify-center items-center"
              onPress={() => {}}
            >
              <Ionicons name="finger-print-outline" size={20} color="#4DB6AC" />
              <Text className="text-teal-500 ml-2">Use Fingerprint</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header */}

        {/* Wallet Card */}
        <View className="mx-4 mt-4">
          <View className="bg-teal-500 rounded-xl p-4 shadow-lg">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-sm">Available Balance</Text>
              <TouchableOpacity>
                <Ionicons name="refresh" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-white text-3xl font-bold mb-1">
              ₦{balance.toFixed(2)}
            </Text>
            <Text className="text-white/80 text-sm mb-4">EVEND WALLET</Text>
            <TouchableOpacity
              className="bg-white/20 rounded-lg py-2 px-4 self-end"
              activeOpacity={0.8}
              onPress={() => router.push("/top-up")}
            >
              <Text className="text-white font-medium">Top Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mx-4 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-800 text-lg font-medium">
              Recent Transaction
            </Text>
            <TouchableOpacity>
              <Text className="text-teal-500">View All</Text>
            </TouchableOpacity>
          </View>
          {transactions.length > 0 ? (
            transactions.slice(0, 3).map(renderTransactionItem)
          ) : (
            <View className="bg-white rounded-xl p-4 shadow-sm">
              <Text className="text-gray-500 text-center">
                No recent transactions.
              </Text>
            </View>
          )}
        </View>

        {/* Select a Drink */}
        <View className="mx-4 mt-6 mb-8">
          <Text className="text-gray-800 text-lg font-medium mb-4">
            Select a Drink
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {drinks.map((drink) => (
              <TouchableOpacity
                key={drink.id}
                className="w-[48%] bg-white rounded-xl overflow-hidden mb-4 shadow-sm"
                activeOpacity={0.7}
                onPress={() => handleDrinkSelect(drink)}
              >
                <Image
                  // source={{ uri: drink.image }}
                  source={drink.image}
                  className="w-full h-32"
                  resizeMode="cover"
                />
                <View className="p-3">
                  <Text className="text-gray-800 font-medium mb-1">
                    {drink.name}
                  </Text>
                  <View className="bg-teal-500 self-start rounded-full px-2 py-1">
                    <Text className="text-white text-sm">₦{drink.price}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
