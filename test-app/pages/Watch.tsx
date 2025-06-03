import React, { useState } from 'react';
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
import { ManifestJson } from '@video/video-client-core/lib/api';

function Watch(): React.JSX.Element {
  const [source, setSource] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const adapter = require("@video/video-client-core").adapter;
  const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;

  adapter.implement(new ReactNativeDevice());


  const emitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.ManifestPlayerEvents);
  //crypto.randomUUID()
  const vcOptions: types.VideoClientOptions = {
    backendEndpoints: ['https://dev1.devspace.lsea4.livelyvideo.tv'],
    displayName: "Test-App Demo (React Native)",
    loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
    userId: 'bones',
  };

  const videoClient = new VideoClient(vcOptions);

  emitter.addListener("manifestPlayer.uri.onChanged", async (opts: {uri: string}) => {
console.log('manifestPlayer.uri.onChanged: ' + JSON.stringify(opts));
    try {
      const playerOptions: types.PlayerOptions = {
        autoPlay: true,
        muted: false,
        players: ['webrtc', 'native-hls', 'hlsjs', 'flvhttp'],
        retryCall: true,
      };
      const player = videoClient.requestPlayer(opts.uri, playerOptions);
      player.on("playerAccessDenied", () => {
        Alert.alert('Access Denied')
      });
      player.on('driver', (d: string) => {
        console.log('new driver: ' + d);
      });
      (player as any).provider?.on('source', (manifest: ManifestJson) => {
        setSource(manifest.formats['mp4-hls']?.manifest ?? '');
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
      console.log('vdc loaded')
    } catch (err) {
      throw new Error(`Error initializing player: ${err instanceof Error ? err.message : String(err)}`);
    }
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <NFManifestPlayer style={styles.player} manifestUri="https://ia601606.us.archive.org/15/items/big-buck-bunny-trailer/Big-buck-bunny_trailer.webm" /> */}
    <NFManifestPlayer style={styles.player} manifestUri={source} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
  sectionTitleLarge: {
    fontSize: 19,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  containerPadded: {
    marginHorizontal: 'auto',
    marginVertical: 24,
    textAlign: 'center',
  },
  button: {
    width: 200,
    height: 60,
  },
  player: {
    height: '100%',
    textAlign: 'center',
  },
});

export default Watch;
