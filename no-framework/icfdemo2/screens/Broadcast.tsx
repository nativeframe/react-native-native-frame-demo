import { StyleSheet, View } from 'react-native';
import Encoder from '../components/SampleEncoder';

export default function Broadcast() {
  return (
    <View style={styles.container}>
      <Encoder/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});