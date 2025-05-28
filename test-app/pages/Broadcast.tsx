import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NFBroadcaster } from '@nativeframe/react-native-native-frame';

function Broadcast(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
     <NFBroadcaster style={styles.player} uri="..." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  sectionTitleLarge: {
    fontSize: 19,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  containerPadded: {
    marginHorizontal: 'auto',
    marginVertical: 24,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 60,
  },
  player: {
    height: '100%',
    textAlign: 'center',
  },
});

export default Broadcast;
