import React from 'react';
import type {PropsWithChildren} from 'react';
import {
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
// import { NativeFrame } from '@nativeframe/react-native-native-frame';

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
          },styles.sectionContainer,{textAlign: 'center'}
        ]}>
        TestApp (React Native)
      </Text>

          <Section title="Components">
            {/* <NFButton text="my custom button" onClicked={()=>{
             new NativeFrame().initVideoClient("", "");

            }} style={styles.button} /> */}

            <NFButton text="stream button" style={styles.button}/>
          </Section>

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
  button: {
    width: 200,
    height: 60,
  },
  player: {
    width:  200,
    height: 150,
    marginBottom: 100,
  },
});

export default App;
