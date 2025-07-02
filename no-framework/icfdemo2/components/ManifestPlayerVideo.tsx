import { useEffect, useRef, useState } from "react";
import ManifestPlayer from "./ManifestPlayer";
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
  }, [manifestPlayer.state.format]);

  useEffect(() => {
    if (!manifestPlayer.props.autoplay) {
      videoRef.current?.setNativeProps({ paused: true });
    }
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
        {manifestPlayer.state.paused ? (
        <Button
          onPress={() => {
            manifestPlayer.onRequestVideoPlay();
            videoRef.current?.setNativeProps({ paused: false });
          }}
          title="Play"
        />
      ) : (
        <Button
          onPress={() => {
            manifestPlayer.onRequestVideoPause();
            videoRef.current?.setNativeProps({ paused: true });
          }}
          title="Pause"
        />
      )}
      <View style={{height: 8} } />
      <Button onPress={() => manifestPlayer.onRequestVideoMuteToggle()} title="Toggle Mute"/>
    <View style={{height: 8} } />
      <Button onPress={() => manifestPlayer.onRequestReloadPlayer()} title="Refresh Player" />
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
  },
  qualityPicker: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: 280,
  },
  btns: {
  }
});