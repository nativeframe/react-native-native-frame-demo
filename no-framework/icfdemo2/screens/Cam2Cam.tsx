import { StyleSheet, Text, View } from 'react-native';
import NFCam2Cam from '../components/NFCam2Cam';
import { getNFSession } from '../util/NFSession';

export default function Cam2Cam() {
  return (
    <View style={styles.container}>
      <Text>Cam 2 Cam</Text>

      <NFCam2Cam session={getNFSession('React-Native Demo', 'react-native-icf-demo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  },
});