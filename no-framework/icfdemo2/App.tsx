import { createStaticNavigation } from '@react-navigation/native';
import Player from './screens/Player';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Broadcast from './screens/Broadcast';
import Cam2Cam from './screens/Cam2Cam';
import Settings from './screens/Settings';
import { implementDevice } from './support';

implementDevice();

const MyTabs = createBottomTabNavigator({
  screens: {
    Watch: Player,
    Broadcast: Broadcast,
    Cam2Cam: Cam2Cam,
    Settings: Settings,
  },
   screenOptions: ({ route }) => ({
    tabBarIcon: ({ }) => {
      let icon = require('./assets/icon/video.png');

      if (route.name === 'Broadcast') {
        icon = require('./assets/icon/stream.png');
      } else if (route.name === 'Cam2Cam') {
        icon = require('./assets/icon/camera.png');
      }else if (route.name === 'Settings') {
        icon = require('./assets/icon/settings.png');
      }

      return <Image  style={styles.tinyLogo} source={icon}/>;
    },
  }),
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return <Navigation />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: '70%',
    height: '70%',
  },
  logo: {
    width: 66,
    height: 58,
  },
});