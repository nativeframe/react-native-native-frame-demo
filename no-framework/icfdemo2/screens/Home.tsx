import { Button, StyleSheet, Text, View } from 'react-native';
import { rnLogger } from '../support/reactnative-log';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Test App</Text>

      <Button title='Home' onPress={()=>rnLogger.log('clicked')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  },
});
