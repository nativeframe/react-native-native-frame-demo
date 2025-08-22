import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Encoder, getSession } from '@video/react-native-sdk';

export default function PageEncoder() {
  const mySession = getSession({
    backendEndpoint: 'https://platform.nativeframe.com', displayName: 'React-Native Demo', streamName: 'react-native-demo',
  });

  return (
    <View style={styles.container}>
      <Encoder session={mySession} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});