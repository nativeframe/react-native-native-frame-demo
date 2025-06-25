import React from 'react';
import {
  DeviceEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { NFBroadcaster } from '@nativeframe/react-native-native-frame';
import { mediaController, types, VideoClient } from '@video/video-client-core';
import { getAuthTokenForDemo } from '../util/AppUtil';
import { rnLogger } from './reactnative-log';

function Broadcast(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  const adapter = require("@video/video-client-core").adapter;
    const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;
  
    adapter.implement(new ReactNativeDevice());
  
    const endpoint = 'https://dev1.devspace.lsea4.livelyvideo.tv';
    //crypto.randomUUID()
    const uID = 'm-test';
    const vcOptions: types.VideoClientOptions = {
      backendEndpoints: [endpoint],
      token: async () => {
        return await getAuthTokenForDemo(endpoint);
      },
      displayName: "Test-App Demo (React Native)",
      loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
      userId: uID,
    };

    const videoClient = new VideoClient(vcOptions);


    const emitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.ManifestPlayerEvents);

    emitter.addListener("broadcaster.onBroadcast", async (opts: {uri: string}) => {
      
      // const auth = new getAuthToken({ctx: videoClient})
      const call = await videoClient.createCall({
        // streamKey: 'm-test',
        userId: uID,
      });

      let mc: types.MediaStreamControllerAPI | undefined;
      try {
        await mediaController.init();
       mc = await mediaController.requestController();
      } catch (error) {
        rnLogger.error(error);
      }

      if(!mc)
      {
        return;
      }

      mc.on('source', (stream) => {
        console.log('BILLY JOEL: '+ stream.getVideoTracks().length);
        console.log('BILLY JOEL: '+ (stream as any).toURL());
      });
      const b = await call.broadcast(mc, {streamName: 'icf-msg'});
      
      b.on('error',(e)=> {
        console.log('BILLY JOEL: '+ e.toJSON());
      });
      
    });

  return (
    <SafeAreaView style={backgroundStyle}>
     <NFBroadcaster style={styles.broadcaster} uri="..." />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  broadcaster: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
});

export default Broadcast;
