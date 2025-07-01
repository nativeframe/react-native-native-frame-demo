import React, { useEffect, useState } from 'react';
import {
  Alert,
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

import { VideoClient, types } from '@video/video-client-core';
import { NFManifestPlayer } from '@nativeframe/react-native-native-frame';
import { CallAPI, ManifestJson, PlayerAPI } from '@video/video-client-core/lib/api';
import { endpoint_demo, getAuthTokenForDemo } from '../util/AppUtil';
import { MediaStream } from '@videomobile/react-native-webrtc';
import { rnLogger } from './reactnative-log';

function Watch(): React.JSX.Element {
  const [source, setSource] = useState({ hls: '', webrtc: '' });
  const isDarkMode = useColorScheme() === 'dark';

  const adapter = require("@video/video-client-core").adapter;
  const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;

  adapter.implement(new ReactNativeDevice());

  const mainOpts = { userId: 'icf-msg-test-user', streamKey: 'mobile' };
  const vcOptions: types.VideoClientOptions = {
    backendEndpoints: [endpoint_demo],
    token: async () => {
      return await getAuthTokenForDemo(mainOpts);
    },
    displayName: "Test-App Demo (React Native)",
    loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
    userId: mainOpts.userId,
  };

  const videoClient = new VideoClient(vcOptions);
  let player: PlayerAPI | undefined;
  const emitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.ManifestPlayerEvents);
  let mediaStream: MediaStream | null = null;

  emitter.addListener("manifestPlayer.uri.onChanged", async (opts: { uri: string }) => {
    try {
      const playerOptions: types.PlayerOptions = {
        autoPlay: true,
        muted: false,
        players: ['webrtc', 'native-hls', 'hlsjs', 'flvhttp'],
        retryCall: true,
      };
      player = videoClient.requestPlayer(opts.uri, playerOptions);
      player.on("playerAccessDenied", () => {
        rnLogger.error('access denied');
      });
      player.on('driver', (d: string) => {
        console.log('new driver: ' + d);
      });
      (player as any).on('joinedCall', ({ call }: { call: CallAPI }) => {
        if (!call) return;

        call.on('streamAdded', (event) => {
          event.stream.on('source', (stream) => {
            const tracks = stream.getTracks();
            if (mediaStream) {
              tracks.forEach((track) => {
                mediaStream?.removeTrack(track as any);
              });
            }

            mediaStream = new MediaStream();

            tracks.forEach((track) => {
              if (player?.localAudioMuted && track.kind === 'audio') { track.enabled = false; }
              if (player?.localVideoPaused) { track.enabled = false; }
              mediaStream?.addTrack(track as any);
            });

            const mediaStreamURL = (mediaStream as any).toURL();
            setSource({ hls: '', webrtc: mediaStreamURL ?? '' });
          });
        });
      });

      (player as any).provider?.on('source', (manifest: ManifestJson) => {
        setSource({ hls: manifest.formats['mp4-hls']?.manifest ?? '', webrtc: '' });
        // const format = manifest.formats?.[this.state.format];

        // if (isGenericFormat(format) && format.manifest) {
        //   const currentQualityLayer = ((player as any)?.currentPlayer as CorePlayer)?.currentQuality?.layer;

        //   let source: string;
        //   if (currentQualityLayer != null && currentQualityLayer.id !== '' && (player as any)?.preferredLevel) {
        //     source = currentQualityLayer.id.toString();
        //   } else {
        //     source = format.manifest;
        //   }

        //    console.log('new driver source: ' + source)
        // }
      });
    } catch (err) {
      throw new Error(`Error initializing player: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  useEffect(() => {

    return () => {
      player?.dispose('component unmount');
      videoClient?.dispose('component unmount');
    };
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <NFManifestPlayer style={styles.player} playerParams={source} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  player: {
    height: '100%',
    textAlign: 'center',
  },
});

export default Watch;
