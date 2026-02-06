import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getBackendUrl = () => {
  // 1. Try to get the host URI from Expo (works dynamically for developing on LAN)
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(':')[0];

  if (localhost) {
    return `http://${localhost}:3000/analyze`;
  }

  // 2. Fallback to the detected machine IP (Update this if your IP changes!)
  const MACHINE_IP = '192.168.222.197';

  if (Platform.OS === 'android') {
    // Android Emulator special alias (if not on LAN)
    // return 'http://10.0.2.2:3000/analyze';
    return `http://${MACHINE_IP}:3000/analyze`;
  }

  // iOS Simulator or Physical Device
  return `http://${MACHINE_IP}:3000/analyze`;
};

export async function analyzeText(text) {
  if (!text.trim()) throw new Error('No text provided');

  const backendUrl = getBackendUrl();
  console.log('Attempting to connect to:', backendUrl); // DEBUG LOG

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Analysis Service Error:', err);
    throw new Error(`Connection Failed: ${err.message}. Ensure server is running at ${backendUrl}`);
  }
}
