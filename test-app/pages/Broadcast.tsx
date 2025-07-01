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

import { NFBroadcaster, NFBroadcast } from '@nativeframe/react-native-native-frame';
import { mediaController, types, VideoClient } from '@video/video-client-core';
import { endpoint_demo, getAuthTokenForDemo } from '../util/AppUtil';
import { rnLogger } from './reactnative-log';

function Broadcast(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  let videoClient: types.VideoClientAPI | undefined;
  let mc: types.MediaStreamControllerAPI | undefined;
  let call: types.CallAPI;
  let broadcast: types.BroadcastAPI;
  const adapter = require("@video/video-client-core").adapter;
  const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;

  adapter.implement(new ReactNativeDevice());

  const mainOpts = {userId: 'icf-msg-test-user', streamKey: 'mobile'};
  const vcOptions: types.VideoClientOptions = {
    backendEndpoints: [endpoint_demo],
    token: async () => {
      return await getAuthTokenForDemo(mainOpts);
    },
    displayName: "Test-App Demo (React Native)",
    loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
    userId: mainOpts.userId,
  };

  videoClient = new VideoClient(vcOptions);
  const emitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.ManifestPlayerEvents);

  emitter.addListener("broadcaster.camera.enable", async (opts: { enable: boolean }) => {
    if (mc) {
      mc.videoPaused = !opts.enable;
    }
  });
  emitter.addListener("broadcaster.mic.enable", async (opts: { enable: boolean }) => {
    if (mc) {
      mc.audioMuted = !opts.enable;
    }
  });
  emitter.addListener("broadcaster.onBroadcast.pause", async () => {
    broadcast?.pause();
  });

  emitter.addListener("broadcaster.onBroadcast.start", async (opts: { uri: string }) => {
    if (broadcast && broadcast.state === 'active') {
      return;
    }
    if (broadcast && broadcast.state === 'paused') {
      broadcast.resume();
      return;
    }

    if (!mc) {
      try {
        await mediaController.init();
        mc = await mediaController.requestController();
      } catch (error) {
        rnLogger.error(error);
      }
    }

    if (!mc) {
      rnLogger.error('could not initialize media controller');
      return;
    }

    if (!call || call.state === 'closed') {
      call = await videoClient.createCall({
        userId: mainOpts.userId,
      });
    }

    const [device] = mediaController.videoDevices().filter((d) => (d as any).facing === 'front');

    if (device) {
      mc.videoDeviceId = device.deviceId;
    } else {
      rnLogger.error('no front camera(s)');
    }

    mc.on('source', (stream) => {
      NFBroadcast?.webRTC((stream as any).toURL());
    });

    broadcast = await call.broadcast(mc, { streamName: 'icf-msg' });

    broadcast.on('error', (e) => {
      rnLogger.error(e);
    });

  });

  useEffect(() => {

    return () => {
      mc?.close('component unmount');
      call?.close('component unmount');
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
