import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, LogBox, SafeAreaView } from 'react-native';
import Encoder from './pages/PageEncoder';
import Player from './pages/PagePlayer';
import PageSimplePlayer from './pages/PageSimplePlayer';

LogBox.ignoreAllLogs();

type TabKey = 'simplePlayer' | 'player' | 'broadcast';

const tabs = [
  { key: 'simplePlayer' as TabKey, title: 'SimplePlayer', icon: require('./assets/icon/video.png') },
  { key: 'player' as TabKey, title: 'Player', icon: require('./assets/icon/video.png') },
  { key: 'broadcast' as TabKey, title: 'Broadcast', icon: require('./assets/icon/stream.png') },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('simplePlayer');

  const renderContent = () => {
    switch (activeTab) {
      case 'simplePlayer':
        return <PageSimplePlayer />;
      case 'player':
        return <Player />;
      case 'broadcast':
        return <Encoder />;
      default:
        return <PageSimplePlayer />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {renderContent()}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isFocused = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabItem, isFocused && styles.tabItemFocused]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Image style={styles.tinyLogo} source={tab.icon} />
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  tabItemFocused: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  tinyLogo: {
    width: 24,
    height: 24,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  tabLabelFocused: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
