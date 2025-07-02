import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { endpoint_demo } from '../util/AppUtil';
// import { context, components, hooks, BaseAuthClient } from "@video/video-client-react";
import { components } from "@video/video-client-react";
import { types } from "@video/video-client-core";

export default function Cam2Cam() {

  // const { Video, CreateCallButtonBase, EndCallButton, StartBroadcastButton, EndBroadcastButton } = components;
  const {  EndBroadcastButtonBase } = components;
  // const {  EndBroadcastButtonBase } = components;

  const [call, setCall] = useState<types.CallAPI | undefined>(undefined);
  // const [authClient, setAuthClient] = useState<types.AuthClient | undefined>(undefined);
  const [broadcast, setBroadcast] = useState<types.BroadcastAPI | undefined>(undefined);

  //  useEffect(() => {
  //   if (mediaStreamController != null) {
  //     const mockCanvas = async (): Promise<void> => {
  //       const canvas = await getMockCanvas();
  //       mediaStreamController.videoDeviceId = "capturable";
  //       mediaStreamController.capturable = { element: canvas } as unknown as types.Capturable;
  //     };
  //     mockCanvas();
  //   }
  // }, [mediaStreamController]);

  //   useEffect(() => {
  //   if (authClient == null && backendEndpoint != null && authUrl != null) {
  //     setAuthClient(
  //       new BaseAuthClient(
  //         null,
  //         tokenRefresher({
  //           backendEndpoint,
  //           clientReferrer,
  //           streamKey: crypto.randomUUID(),
  //           scope: "broadcaster",
  //           authUrl,
  //         }),
  //       ),
  //     );
  //   }
  // }, [authClient]);

  return (
    <View style={styles.container}>
      <Text>Cam 2 Cam</Text>

      {/* <CreateCallButtonBase callOptions={{
        streamKey: crypto.randomUUID(),
        user: { userId: "123", displayName: "John Doe" },
        backendEndpoints: [endpoint_demo],
        auth: authClient,
      }}
        setCall={setCall} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', justifyContent: 'center'
  },
});