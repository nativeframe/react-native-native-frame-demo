import React, { useEffect } from 'react';
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

import { NFBroadcaster, NFBroadcast} from '@nativeframe/react-native-native-frame';
import { mediaController, types, VideoClient } from '@video/video-client-core';
import { getAuthTokenForDemo } from '../util/AppUtil';
import { rnLogger } from './reactnative-log';

function Broadcast(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  let videoClient: types.VideoClientAPI | undefined;
  let mc: types.MediaStreamControllerAPI | undefined;
  const adapter = require("@video/video-client-core").adapter;
    const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;
  
    adapter.implement(new ReactNativeDevice());
  
    const endpoint = 'https://dev2.devspace.lsea4.livelyvideo.tv';
    //crypto.randomUUID()
    const uID = 'icf-test';
    const vcOptions: types.VideoClientOptions = {
      backendEndpoints: [endpoint],
      token: async () => {
        return await getAuthTokenForDemo(endpoint);
      },
      displayName: "Test-App Demo (React Native)",
      loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
      userId: uID,
    };

   videoClient = new VideoClient(vcOptions);
    const emitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.ManifestPlayerEvents);
    
    emitter.addListener("broadcaster.onBroadcast", async (opts: {uri: string}) => {
      const call = await videoClient.createCall({
        userId: uID,
      });

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

       mc.videoDeviceId = mediaController.videoDevices()[0].deviceId;
      mc.on('source', (stream) => {
         NFBroadcast?.webRTC((stream as any).toURL());
       
      });
      const b = await call.broadcast(mc, {streamName: 'icf-msg'});
      
      b.on('error',(e)=> {
        console.error(e);
      });
      
    });

    emitter.addListener("broadcaster.camera.enable", async (opts: {enable: boolean}) => {
        if(mc){
          mc.videoDisabled = !opts.enable;
        }
    });
    emitter.addListener("broadcaster.mic.enable", async (opts: {enable: boolean}) => {
        if(mc){
          mc.audioDisabled = !opts.enable;
        }
    });

    useEffect(() => {

    return () => {
      videoClient?.dispose('component unmount');
    };
  }, []);
  
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
