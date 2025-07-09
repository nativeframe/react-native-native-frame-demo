import { StyleSheet, Text, TextInput, View } from 'react-native';
import ManifestPlayer from '../components/SampleManifestPlayer';
import { useEffect, useState } from 'react';
import ManifestPlayerVideo from '../components/SampleManifestPlayerVideo';

export default function Player() {
  const [manifestUrl, setManifestUrl] = useState('');

  useEffect(() => {
  })
  return (
    <View style={styles.container}>
      <Text style={styles.head}>Manifest url:</Text>
      <TextInput style={styles.input} onChangeText={setManifestUrl} value={manifestUrl} />
      <ManifestPlayer manifestUrl={manifestUrl} autoplay>
        {({ manifestPlayer }) => <ManifestPlayerVideo manifestPlayer={manifestPlayer} />}
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