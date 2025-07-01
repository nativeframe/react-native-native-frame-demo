
export const endpoint_demo = 'https://dev2.devspace.lsea4.livelyvideo.tv';

export async function getAuthTokenForDemo(opts: {userId: string, streamKey: string}): Promise<string> {
  const streamKey = 'stream1';
  const resp = await fetch(`${endpoint_demo}/apps/demos/api/demo/v1/access-token`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scopes: ['broadcaster', 'private-broadcaster'],
      userId: opts.userId,
      data: {
        displayName: `User ${opts.userId}`,
        mirrors: [
          {
            id: `${streamKey}-${opts.userId}`,
            streamName: "mobile",
            kind: "rtmp",
            rtmpPath: `/origin_proxy/${streamKey}`,
            clientEncoder: "mobile",
            streamKey: streamKey,
            clientReferrer: "demo"
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