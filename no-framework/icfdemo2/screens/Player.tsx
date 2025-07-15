import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import NFManifestPlayer from '../components/NFManifestPlayer';
import NFManifestPlayerVideo from '../components/NFManifestPlayerVideo';

export default function Player() {
  const [manifestUrl, setManifestUrl] = useState('');

  useEffect(() => {
  })
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <NFManifestPlayer manifestUrl={manifestUrl} autoplay>
        {({ manifestPlayer }) => <NFManifestPlayerVideo manifestPlayer={manifestPlayer} />}
      </NFManifestPlayer>
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