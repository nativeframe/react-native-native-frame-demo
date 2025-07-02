import { Button, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { rnLogger } from '../support/reactnative-log';

export default function Home() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
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
