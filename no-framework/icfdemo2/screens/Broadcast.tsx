import { mediaController, types, VideoClient } from '@video/video-client-core';
import { StyleSheet, Button, View } from 'react-native';
import { endpoint_demo, getAuthTokenForDemo, getDefaultMediaStreamControllerOptions } from '../util/AppUtil';
import { useEffect, useState } from 'react';
import { rnLogger } from '../support/reactnative-log';
import { RTCView } from '@videomobile/react-native-webrtc';
import { uuidv4 } from '@video/video-client-core/lib/internal/utils';

let videoClient: types.VideoClientAPI | undefined;
let mc: types.MediaStreamControllerAPI | undefined;
let call: types.CallAPI | undefined;
let broadcast: types.BroadcastAPI | undefined;

export default function Broadcast() {
  const s = uuidv4();
  const mainOpts = {
    displayName: "React-Native Demo",
    userId: s, streamId: s, streamName: 'icf-msg'
  };
  const [source, setSource] = useState<string | undefined>();

  useEffect(() => {
    load()

    return () => {
      mc?.close('component unmount');
      call?.close('component unmount');
      videoClient?.dispose('component unmount');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  function load() {
    const vcOptions: types.VideoClientOptions = {
      backendEndpoints: [endpoint_demo],
      token: async () => {
        return await getAuthTokenForDemo(mainOpts);
      },
      displayName: mainOpts.displayName,
      loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
      userId: mainOpts.userId
    };

    videoClient = new VideoClient(vcOptions);
  }

  async function goBroadcast() {
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
        const controllerOpts = getDefaultMediaStreamControllerOptions();
        mc = await mediaController.requestController(controllerOpts);
        rnLogger.log(`used media controller options`, controllerOpts);
      } catch (error) {
        rnLogger.error(error);
      }
    }

    if (!mc) {
      rnLogger.error('could not initialize media controller');
      return;
    }

    if (!call || call.state === 'closed') {
      call = await videoClient?.createCall({
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
      setSource((stream as any).toURL())
    });

    broadcast = await call?.broadcast(mc, { streamName: mainOpts.streamName });

    broadcast?.on('error', (e) => {
      rnLogger.error(e);
    });

  }

  return (
    <View style={styles.container}>
      <Button onPress={() => goBroadcast()} title="Broadcast" />
      <View style={styles.rtcview}>
        {source && <RTCView mirror style={styles.rtcFull} streamURL={source} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20
  },
  rtcview: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    width: '80%',
    backgroundColor: 'black',
  },
  rtc: {
    width: 300,
    height: 600,
  },
  rtcFull: {
    height: '100%',
    width: '100%',
  },
});