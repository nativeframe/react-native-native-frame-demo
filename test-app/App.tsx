import { createStaticNavigation, ParamListBase, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, LogBox, StyleSheet } from 'react-native';
import React from 'react';
import Encoder from './pages/PageEncoder';
import Player from './pages/PagePlayer';

LogBox.ignoreAllLogs();

const getTitle = (route: RouteProp<ParamListBase, string>) => {
  return route.name
}

const MyTabs = createBottomTabNavigator({
  screens: {
    Player: Player,
    Broadcast: Encoder
  },
  screenOptions: ({ route }) => ({
    tabBarLabel: getTitle(route),
    tabBarIcon: ({ }) => {
      let icon = require('./assets/icon/video.png');

      if (route.name === 'Broadcast') {
        icon = require('./assets/icon/stream.png');
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