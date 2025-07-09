import { useEffect, useRef, useState } from "react";
import ManifestPlayer from "./SampleManifestPlayer";
import { Button, StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RTCView } from "@videomobile/react-native-webrtc";
import Video from 'react-native-video';

export default function ManifestPlayerVideo({ manifestPlayer }: { manifestPlayer: ManifestPlayer }) {
  const [preferredLevel, setPreferredLevel] = useState('');
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (manifestPlayer.state.format === 'webrtc') {
      const interval = setInterval(() => {
        manifestPlayer.onRequestTimeupdate();
      }, 1000);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestPlayer.state.format]);

  useEffect(() => {
    if (!manifestPlayer.props.autoplay) {
      videoRef.current?.setNativeProps({ paused: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View>
      <Text style={styles.label}>Current driver: {manifestPlayer.state.driver}</Text>
      <Text style={styles.label}>Current quality</Text>
      <Picker
        selectedValue={preferredLevel}
        style={{ height: 50, width: 250 }}
        onValueChange={(quality: string) => {
          manifestPlayer.onRequestPreferredQualityChange(quality);
          setPreferredLevel(quality);
        }}
      >
        {manifestPlayer.availableQualities.map((quality) => (
          <Picker.Item key={quality} label={quality} value={quality} />
        ))}
      </Picker>
      {manifestPlayer.state.driver === 'webrtc' ? (
        <RTCView mirror style={styles.backgroundVideo} streamURL={manifestPlayer.state.source ?? ''} />
      ) : (
        <>
          <Text>HLS Player</Text>
          <Video
            ref={videoRef}
            source={{
              uri: manifestPlayer.state.source ?? '',
            }}
            style={styles.backgroundVideo}
            muted={manifestPlayer.player?.localAudioMuted ?? false}
            onProgress={() => manifestPlayer.onRequestTimeupdate()}
          />
        </>
      )}

      <View style={styles.btns}>
        <View style={styles.btn}><Button
          onPress={() => {
            if (manifestPlayer.state.paused) {
              manifestPlayer.onRequestVideoPlay();
              videoRef.current?.setNativeProps({ paused: false });
            } else {
              manifestPlayer.onRequestVideoPause();
              videoRef.current?.setNativeProps({ paused: true });
            }

          }}
          title={manifestPlayer.state.paused ? "Play" : "Pause"}
        />
        </View>

        <View style={styles.btn}><Button onPress={() => manifestPlayer.onRequestVideoMuteToggle()} title="Mic" /></View>

        <View style={styles.btn}><Button onPress={() => manifestPlayer.onRequestReloadPlayer()} title="Refresh" /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
  },
  backgroundVideo: {
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center'
  },
  qualityPicker: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 280,
  },
  btns: {
    flexDirection: 'row'
  },
  btn: {
    width: 80,
    marginStart: 5,
    marginRight: 5
  },

});