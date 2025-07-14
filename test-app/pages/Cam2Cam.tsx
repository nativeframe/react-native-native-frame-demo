import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NFCam2Cam } from '@nativeframe/react-native-native-frame';

function Cam2Cam(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const adapter = require('@video/video-client-core').adapter;
  const ReactNativeDevice = require('./reactnative-device').ReactNativeDevice;

  adapter.implement(new ReactNativeDevice());

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
    <NFCam2Cam style={styles.player} uri='...' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  player: {
    height: '100%',
    textAlign: 'center',
  },
});

export default Cam2Cam;
