import { uuidv4 } from "@video/video-client-core/lib/internal/utils";

export interface NFSession {
    displayName: string;
    userId: string;
    streamId: string;
    streamName: string;
}

export function getNFSession(displayName: string, streamName: string): NFSession {
    const s = uuidv4();
    return {
        displayName: displayName,
        userId: s, streamId: s,
        streamName: streamName
    };
}