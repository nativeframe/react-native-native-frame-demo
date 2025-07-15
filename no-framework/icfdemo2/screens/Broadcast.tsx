import { StyleSheet, View } from 'react-native';
import NFEncoder from '../components/NFEncoder';

export default function Broadcast() {
  return (
    <View style={styles.container}>
      <NFEncoder/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});