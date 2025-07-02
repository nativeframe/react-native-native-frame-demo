import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

export default function Broadcast() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>Broadcast</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  },
});