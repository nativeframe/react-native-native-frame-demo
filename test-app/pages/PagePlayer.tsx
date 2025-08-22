import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { ManifestPlayer, ManifestPlayerVideo, getSession } from '@video/react-native-sdk';

export default function PagePlayer() {
  const [manifestUrl, setManifestUrl] = useState('');

  const mySession = getSession({
    backendEndpoint: 'https://platform.nativeframe.com', displayName: 'React-Native Demo', streamName: 'react-native-demo',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <ManifestPlayer manifestUrl={manifestUrl} session={mySession} autoplay>
        {({ manifestPlayer }) => <ManifestPlayerVideo manifestPlayer={manifestPlayer} fixedWidth={true} showButtons={true} showDriver={false} showQualitySelect={false} />}
      </ManifestPlayer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  head: {
    fontWeight: '600',
    marginTop: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderRadius: 3,
  },
});