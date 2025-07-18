import { createStaticNavigation, ParamListBase, RouteProp } from '@react-navigation/native';
import Player from './screens/Player';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Broadcast from './screens/Broadcast';
import Cam2Cam from './screens/Cam2Cam';
import { implementDevice } from './support';
import Settings from './screens/Settings';
import Cam2CamViewer from './screens/Cam2CamViewer';

implementDevice();

const getTitle = (route: RouteProp<ParamListBase, string>) => {
  if (route.name === 'Cam2CamViewer') {
    return 'View';
  }
  return route.name
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Watch: Player,
    Broadcast: Broadcast,
    Cam2Cam: Cam2Cam,
    Cam2CamViewer: Cam2CamViewer,
    Settings: Settings,
  },
  screenOptions: ({ route }) => ({
    tabBarLabel: getTitle(route),
    tabBarIcon: ({ }) => {
      let icon = require('./assets/icon/video.png');

      if (route.name === 'Broadcast') {
        icon = require('./assets/icon/stream.png');
      } else if (route.name === 'Cam2Cam' || route.name === 'Cam2CamViewer') {
        icon = require('./assets/icon/camera.png');
      } else if (route.name === 'Settings') {
        icon = require('./assets/icon/settings.png');
      }

      return <Image style={styles.tinyLogo} source={icon} />;
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