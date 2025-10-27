import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import {
  ManifestPlayer, ManifestPlayerVideo, ManifestPlayerVideoCustomControls,
  getSession,
} from '@video/react-native-sdk';

export default function PagePlayer() {
  const [manifestUrl, setManifestUrl] = useState('');

  const mySession = getSession({
    backendEndpoint: 'https://platform.nativeframe.com', displayName: 'React-Native Demo', streamName: 'react-native-demo',
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Custom UI</Text>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <View style={styles.playerContainer}>
        <ManifestPlayer manifestUrl={manifestUrl} session={mySession} autoplay>
          {({ manifestPlayer }) => <ManifestPlayerVideoCustomControls style={styles.video}
            manifestPlayer={manifestPlayer}
            onLoad={() => { console.log('loaded'); }}>
            <View>
              {/* custom UI */}
              <View style={styles.overlayContent}>
                <Text style={styles.overlayText}>Custom Overlay</Text>
              </View>
            </View>
          </ManifestPlayerVideoCustomControls>}
        </ManifestPlayer>
      </View>

      <Text>Default UI</Text>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <View style={styles.playerContainer}>
        <ManifestPlayer manifestUrl={manifestUrl} session={mySession} autoplay>
          {({ manifestPlayer }) => <ManifestPlayerVideo style={styles.video} manifestPlayer={manifestPlayer}
            showControls={true} showDriver={false} showQualitySelect={false} />}
        </ManifestPlayer>
      </View>
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
    backgroundColor: 'rgba(240, 27, 27, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
