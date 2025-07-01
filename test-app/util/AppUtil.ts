
export const endpoint_demo = 'https://dev2.devspace.lsea4.livelyvideo.tv';

export async function getAuthTokenForDemo(endpoint: string): Promise<string> {
  const userId = 'icf-msg-bill';
  const streamKey = 'stream1';
  const resp = await fetch(`${endpoint}/apps/demos/api/demo/v1/access-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scopes: ['broadcaster', 'private-broadcaster'],
      userId,
      data: {
        displayName: `User ${userId}`,
        mirrors: [
          {
            id: streamKey,
            streamName: "default",
            kind: "rtmp",
            rtmpPath: `/origin_proxy/${streamKey}`,
            clientEncoder: "demo",
            streamKey,
            clientReferrer: "demo",
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