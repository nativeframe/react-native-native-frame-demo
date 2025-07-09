import { CONSTRAINTS_AUDIO_OPTIMAL_STRICT, CONSTRAINTS_AUDIO_OPTIMAL_WEAK, CONSTRAINTS_SCREENCAPTURE_OPTIMAL_WEAK, CONSTRAINTS_VIDEO_OPTIMAL_STRICT, CONSTRAINTS_VIDEO_OPTIMAL_WEAK, types } from "@video/video-client-core";
import { ExistsStreamPolicy } from "@video/video-client-core/lib/api";

export const endpoint_demo = 'https://dev2.devspace.lsea4.livelyvideo.tv';

export async function getAuthTokenForDemo(opts: {displayName: string, userId: string, streamId: string, streamName: string}): Promise<string> {
  const resp = await fetch(`${endpoint_demo}/apps/demos/api/demo/v1/access-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scopes: ['conference-owner'],
      userId: opts.userId,
      data: {
        displayName: opts.displayName,
        mirrors: [
          {
            id: opts.streamId,
            streamName: opts.streamName,
            kind: "rtmp",
            rtmpPath: `/origin_proxy/${opts.streamId}`,
            clientEncoder: "demo",
            clientReferrer: "demo",
            streamKey: opts.streamId
          },
        ],
      },
    }),
    method: "POST",
    mode: "cors",
  });
  const json = await resp.json();

  return json.token as string;
}

  export function getDefaultMediaStreamControllerOptions(): types.MediaStreamControllerOptions {
    return {
      defaultConstraints: {
        audio: CONSTRAINTS_AUDIO_OPTIMAL_STRICT,
        screencapture: CONSTRAINTS_SCREENCAPTURE_OPTIMAL_WEAK,
        video: {
          ...CONSTRAINTS_VIDEO_OPTIMAL_STRICT,

          height: CONSTRAINTS_VIDEO_OPTIMAL_STRICT.height,
          frameRate: { ideal: 24},
        },
      },
      fallbackConstraints: {
        audio: CONSTRAINTS_AUDIO_OPTIMAL_WEAK,
        video: CONSTRAINTS_VIDEO_OPTIMAL_WEAK,
        screencapture: CONSTRAINTS_SCREENCAPTURE_OPTIMAL_WEAK,
      },
      replaceTracks: false,
      waitingDelay: 100,
      defaultLockPolicy: ExistsStreamPolicy.wait,
    }
  }
  