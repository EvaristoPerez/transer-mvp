import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase';

export default function ProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-8">Profile</Text>
      
      {user ? (
        <View>
          <View className="bg-white rounded-lg shadow-md p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-2">Email</Text>
            <Text className="text-gray-600">{user.email}</Text>
          </View>

          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-500 rounded-lg p-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="bg-white rounded-lg shadow-md p-6">
          <Text className="text-gray-600 text-center mb-4">
            You are not signed in
          </Text>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg p-4 items-center"
          >
            <Text className="text-white font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
