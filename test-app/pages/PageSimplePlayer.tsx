import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { useState } from 'react';
import { getSession, VideoPlayer, VideoPlayerMethods } from '@video/react-native-sdk';

export default function PageSimplePlayer() {
  const [manifestUrl, setManifestUrl] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  //optional
  const videoRef = useRef<VideoPlayerMethods>(null);
  const mySession = getSession({
    backendEndpoint: 'https://platform.nativeframe.com', displayName: 'React-Native Demo', streamName: 'react-native-demo',
  });

  useEffect(()=>{
    setTimeout(() => {
      //for a quick test, paste your manifest url here:
      //setManifestUrl('<manifest url>');
    }, 2000);
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Player (no WebRTC)</Text>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <VideoPlayer style={styles.playerContainer} manifestUrl={manifestUrl} session={mySession} ref={videoRef}
        onLiveDvrStateChange={setIsTransitioning} />
      {isTransitioning && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
      <Button title='Rewind' onPress={() => { videoRef.current?.rewind(20)}} />
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
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
    borderRadius: 8,
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
