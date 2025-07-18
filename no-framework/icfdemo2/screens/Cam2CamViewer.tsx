import { StyleSheet, View } from 'react-native';
import NFCam2CamViewer from '../components/NFCam2CamViewer';
import { getNFSession } from '../util/NFSession';

export default function Cam2CamViewer() {
  return (
    <View style={styles.container}>
      <NFCam2CamViewer session={getNFSession('React-Native Demo', 'react-native-icf-demo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});