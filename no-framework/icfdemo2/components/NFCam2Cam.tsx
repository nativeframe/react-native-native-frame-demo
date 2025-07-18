import { mediaController, types, VideoClient } from '@video/video-client-core';
import { StyleSheet, Button, View } from 'react-native';
import { endpoint_demo, getAuthTokenForDemo, getDefaultMediaStreamControllerOptions } from '../util/NFAppUtil';
import { useEffect, useState } from 'react';
import { rnLogger } from '../support/reactnative-log';
import { RTCView } from '@videomobile/react-native-webrtc';
import { NFSession } from '../util/NFSession';

let videoClient: types.VideoClientAPI | undefined;
let mc: types.MediaStreamControllerAPI | undefined;
let call: types.CallAPI | undefined;
let broadcast: types.BroadcastAPI | undefined;

export default function NFCam2Cam(opts:{session: NFSession}) {
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

    async function load() {
        const vcOptions: types.VideoClientOptions = {
            backendEndpoints: [endpoint_demo],
            token: async () => {
                return await getAuthTokenForDemo(opts.session);
            },
            displayName: opts.session.displayName,
            loggerConfig: { clientName: "Test-App", writeLevel: "debug" },
            userId: opts.session.userId
        };

        videoClient = new VideoClient(vcOptions);
        
        // Initialize camera preview immediately
        await initCameraPreview();
    }

    async function initCameraPreview() {
        if (!mc) {
            try {
                await mediaController.init();
                const controllerOpts = getDefaultMediaStreamControllerOptions();
                mc = await mediaController.requestController(controllerOpts);
                rnLogger.log(`used media controller options`, controllerOpts);
            } catch (error) {
                rnLogger.error(error);
                return;
            }
        }

        if (!mc) {
            rnLogger.error('could not initialize media controller');
            return;
        }

        // Set up front camera
        const [device] = mediaController.videoDevices().filter((d) => (d as any).facing === 'front');
        if (device) {
            mc.videoDeviceId = device.deviceId;
        } else {
            rnLogger.error('no front camera(s)');
        }

        // Set up the source stream for preview
        mc.on('source', (stream) => {
            setSource((stream as any).toURL())
        });
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
            await initCameraPreview();
        }

        if (!mc) {
            rnLogger.error('could not initialize media controller');
            return;
        }

        if (!call || call.state === 'closed') {
            call = await videoClient?.createCall({
                userId: opts.session.userId,
            });
        }

        broadcast = await call?.broadcast(mc, { streamName: opts.session.streamName });

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
            <View style={styles.btns}>
                <View style={styles.btn}><Button onPress={() => mc?.toggleMic()} title="Mic" /></View>
                <View style={styles.btn}><Button onPress={() => mc?.toggleCamera()} title="Cam" /></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 20
    },
    rtcview: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        width: '100%',
        backgroundColor: 'black',
    },
    rtcFull: {
        height: '100%',
        width: '100%',
    },
    btns: {
        flexDirection: 'row',
        marginTop: 5
    },
    btn: {
        width: 80,
        marginStart: 5,
        marginRight: 5
    },
});