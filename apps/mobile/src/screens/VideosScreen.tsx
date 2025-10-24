import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { supabase } from '../../src/lib/supabase';

interface Video {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  duration: number | null;
  isPublished: boolean;
  createdAt: string;
}

export default function VideosScreen() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .eq('isPublished', true)
        .order('createdAt', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderVideo = ({ item }: { item: Video }) => (
    <TouchableOpacity className="bg-white rounded-lg shadow-md p-4 mb-4">
      <Text className="text-xl font-bold text-gray-900 mb-2">{item.title}</Text>
      {item.description && (
        <Text className="text-gray-600 mb-2">{item.description}</Text>
      )}
      {item.duration && (
        <Text className="text-sm text-gray-500">
          Duration: {Math.floor(item.duration / 60)}:{String(item.duration % 60).padStart(2, '0')}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <Text className="text-gray-600">Loading videos...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500 text-center">
              No videos available yet.{'\n'}Check back later!
            </Text>
          </View>
        }
      />
    </View>
  );
}
