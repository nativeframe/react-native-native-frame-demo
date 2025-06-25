import React from 'react';
import {
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

import { NFButton } from '@nativeframe/react-native-native-frame';

type Props = { navigation: any }
function Home(props: Props): React.JSX.Element {
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
          <View style={styles.divider} />
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
            <NFButton text="Watch" style={styles.button} onClicked={() => { props.navigation.navigate('Watch'); }} />
            <NFButton text="Go Live" style={styles.button} onClicked={() => {props.navigation.navigate('Go Live');}} />
            <NFButton text="Cam to Cam" style={styles.button} onClicked={() => {props.navigation.navigate('Cam 2 Cam');}} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  sectionTitleLarge: {
    fontSize: 19,
    fontWeight: '600',
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
  divider: {
    height: 20,
  },
});

export default Home;
