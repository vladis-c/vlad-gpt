import {ExpoConfig, ConfigContext} from 'expo/config';

export default ({config}: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'vlad-gpt',
  slug: 'vlad-gpt',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  plugins: [
    ['./plugins/gradle-project-plugin.js'],
    ['./plugins/gradle-app-plugin.js'],
    process.env.NODE_ENV === 'development'
      ? './plugins/file-plugin.js'
      : [
          'expo-build-properties',
          {android: {minSdkVersion: 29, newArchEnabled: false}},
        ],
    [
      '@react-native-voice/voice',
      {
        microphonePermission: 'Allow $(PRODUCT_NAME) to access the microphone',
        speechRecognitionPermission:
          'Allow $(PRODUCT_NAME) to securely recognize user speech',
      },
    ],
  ],
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.vladisc.vladgpt',
    googleServicesFile: './google-services.json',
  },
});
