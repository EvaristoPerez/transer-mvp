import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

type FlashlightMode = 'flashlight' | 'screen';

export default function FlashlightScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<FlashlightMode>('flashlight');
  const [screenFlash, setScreenFlash] = useState(false);
  const cameraRef = useRef<Camera>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      setHasPermission(cameraStatus === 'granted' && audioStatus === 'granted');
    })();
  }, []);

  const startFlashlight = async () => {
    try {
      // Start audio recording to detect beats
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recording.startAsync();
      recordingRef.current = recording;

      // TODO: Implement proper beat detection using FFT analysis
      // For now, using a simple interval as a placeholder
      intervalRef.current = setInterval(() => {
        toggleFlash();
      }, 500); // Flash every 500ms as placeholder

      setIsActive(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start flashlight sync');
      console.error(error);
    }
  };

  const stopFlashlight = async () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (recordingRef.current) {
      await recordingRef.current.stopAndUnloadAsync();
      recordingRef.current = null;
    }

    setIsActive(false);
    setScreenFlash(false);
  };

  const toggleFlash = () => {
    if (mode === 'screen') {
      setScreenFlash(prev => !prev);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // For flashlight mode, the Camera component handles the flash
    // through the flashMode prop that changes based on isActive
  };

  const toggleMode = () => {
    setMode(prev => prev === 'flashlight' ? 'screen' : 'flashlight');
  };

  if (hasPermission === null) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-white">Requesting permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900 p-8">
        <Text className="text-white text-center">
          Camera and microphone permissions are required for this feature.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-900">
      {mode === 'flashlight' && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          type={CameraType.back}
          flashMode={isActive ? FlashMode.torch : FlashMode.off}
        />
      )}
      
      {mode === 'screen' && (
        <View 
          className="flex-1" 
          style={{ backgroundColor: screenFlash ? '#FFFFFF' : '#000000' }}
        />
      )}

      <View className="absolute bottom-0 left-0 right-0 p-8 items-center">
        <TouchableOpacity
          onPress={isActive ? stopFlashlight : startFlashlight}
          className={`w-24 h-24 rounded-full items-center justify-center mb-4 ${
            isActive ? 'bg-red-500' : 'bg-blue-500'
          }`}
        >
          <Text className="text-white font-bold text-lg">
            {isActive ? 'Stop' : 'Start'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={toggleMode}
          disabled={isActive}
          className={`px-6 py-3 rounded-lg ${
            isActive ? 'bg-gray-600' : 'bg-gray-700'
          }`}
        >
          <Text className="text-white font-medium">
            Mode: {mode === 'flashlight' ? 'Flashlight' : 'Screen'}
          </Text>
        </TouchableOpacity>

        <Text className="text-white text-sm mt-4 text-center opacity-70">
          {isActive 
            ? 'Syncing to music...' 
            : 'Start to sync flashlight with music'}
        </Text>
      </View>
    </View>
  );
}
