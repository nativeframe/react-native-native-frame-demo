import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useState } from 'react';
import {
  getSession, VideoPlayer
} from '@video/react-native-sdk';

export default function PageSimplePlayer() {
  const [manifestUrl, setManifestUrl] = useState('');

  const mySession = getSession({
    backendEndpoint: 'https://platform.nativeframe.com', displayName: 'React-Native Demo', streamName: 'react-native-demo',
  });

  useEffect(()=>{
    setTimeout(() => {
      //for a quick test, paste your manifest url here:
      //setManifestUrl('<manifest url>')
    }, 3000);
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Player (no WebRTC)</Text>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <VideoPlayer style={styles.playerContainer} manifestUrl={manifestUrl} session={mySession} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  head: {
    fontWeight: '600',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderRadius: 3,
  },
  playerContainer: {
    width: '90%',
    height: 200,
    marginTop: 10,
    marginBottom: 20,
  },
  video: {
    backgroundColor: '#000',
  },
  overlayContent: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#F01B1B',
    opacity: 0.9,
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
