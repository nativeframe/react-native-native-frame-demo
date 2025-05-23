import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NFButton, NFVideoPlayer } from '@nativeframe/react-native-native-frame';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text
            style={[
              styles.sectionTitleLarge,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              }, styles.sectionContainer, { textAlign: 'center' }
            ]}>
            ICF Messenger (React Native)
          </Text>

          <View style={styles.container}>
            <Image source={require('./../imgs/msg.png')} style={styles.logo} />
          </View>
          <View style={styles.containerPadded}>
            <Text
              style={[
                styles.sectionTitle,
                {
                  color: isDarkMode ? Colors.white : Colors.black,
                },
              ]}>
              What do you want to do?
            </Text>
          </View>


          <View style={styles.container}>
            <NFButton text="Watch" style={styles.button} onClicked={() => { Alert.alert('hey') }} />
            <NFButton text="Go Live" style={styles.button} />
            <NFButton text="Cam to Cam" style={styles.button} />
          </View>
          {/* <Section title="Manifest Player">
            <NFVideoPlayer hls="https://ia601606.us.archive.org/15/items/big-buck-bunny-trailer/Big-buck-bunny_trailer.webm" style={styles.player} />
          </Section> */}

          <Section title="Video Player">
            <NFVideoPlayer hls="https://ia601606.us.archive.org/15/items/big-buck-bunny-trailer/Big-buck-bunny_trailer.webm" style={styles.player} />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
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
    width: 200,
    height: 150,
    marginBottom: 100,
  },
  logo: {
    width: 165,
    height: 100,
  },
});

export default App;
