import { StyleSheet, View } from 'react-native';
import NFEncoder from '../components/NFEncoder';
import { getNFSession } from '../util/NFSession';

export default function Broadcast() {
  return (
    <View style={styles.container}>
      <NFEncoder session={getNFSession('React-Native Demo', 'react-native-icf-demo')}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});