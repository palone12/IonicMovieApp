import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.app.movie',
  appName: 'movieapp',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
};

export default config;
