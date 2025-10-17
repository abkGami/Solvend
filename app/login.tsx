import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions 
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Handle login logic here
    // For now, navigate to tabs
    router.push('/(tabs)');
  };

  const handleSignUp = () => {
    // Handle sign up navigation
    console.log('Navigate to sign up');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log('Navigate to forgot password');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        className="bg-gray-100"
        showsVerticalScrollIndicator={false}
      >
        {/* Background Pattern */}
        <View className="absolute inset-0 bg-gray-100">
          {/* Decorative circles */}
          <View className="absolute top-20 left-10 w-16 h-16 rounded-full border-2 border-gray-300 opacity-30" />
          <View className="absolute top-40 right-8 w-12 h-12 rounded-full border-2 border-gray-300 opacity-30" />
          <View className="absolute top-60 left-20 w-8 h-8 rounded-full border-2 border-gray-300 opacity-30" />
          <View className="absolute bottom-40 right-16 w-20 h-20 rounded-full border-2 border-gray-300 opacity-30" />
          <View className="absolute bottom-60 left-12 w-14 h-14 rounded-full border-2 border-gray-300 opacity-30" />
          <View className="absolute top-80 right-20 w-10 h-10 rounded-full border-2 border-gray-300 opacity-30" />
        </View>

        {/* Main Content */}
        <View className="flex-1 justify-center items-center px-8 py-16">
          {/* Login Card */}
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-lg">
            {/* Header */}
            <View className="items-center mb-8">
              <Text className="text-teal-500 text-3xl font-bold mb-2">
                eVend Login
              </Text>
              <Text className="text-gray-600 text-base">
                Welcome back!
              </Text>
            </View>

            {/* Username Input */}
            <View className="mb-4">
              <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                className="bg-gray-50 rounded-xl px-4 py-4 text-base text-gray-700 border border-gray-200"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View className="mb-6 relative">
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                className="bg-gray-50 rounded-xl px-4 py-4 pr-12 text-base text-gray-700 border border-gray-200"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4"
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                  size={20} 
                  color="#9CA3AF" 
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              className="bg-teal-500 rounded-xl py-4 mb-4 shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-semibold text-center">
                LOG IN
              </Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              className="mb-6"
              activeOpacity={0.7}
            >
              <Text className="text-teal-500 text-center text-base">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="mx-4 text-gray-500 text-sm">OR</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Sign Up */}
            <View className="flex-row justify-center">
              <Text className="text-gray-600 text-base">New user? </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
                <Text className="text-teal-500 text-base font-medium">
                  Sign up now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}