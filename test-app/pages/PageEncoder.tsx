import { StyleSheet, View } from 'react-native';
import { Encoder, getSession } from '@video/react-native-sdk';

export default function PageEncoder() {
  return (
    <View style={styles.container}>
      <Encoder session={getSession('React-Native Demo', 'react-native-icf-demo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});