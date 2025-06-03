export class ReactNativeBrowserAdapter {
  static INSTANCE = new ReactNativeBrowserAdapter({
    platform: "ReactNative",
    userAgent: "ReactNative",
  });

  readonly platform: string;

  userAgent: string;

  defaultSettingsVideo: {
    frontCamera: boolean;
    minWidth: number;
    minHeight: number;
    minFrameRate: number;
  };

  private constructor(opts: { platform: string; userAgent: string }) {
    this.platform = opts.platform;
    this.userAgent = opts.userAgent;
    this.defaultSettingsVideo = {
      frontCamera: true,
      minWidth: 500,
      minHeight: 300,
      minFrameRate: 15,
    };
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const globalThis: any = global;
if (globalThis?.navigator != null && globalThis.navigator.userAgent == null) {
  Object.defineProperty(globalThis.navigator, "userAgent", {
    enumerable: true,
    configurable: true,
    get(): any {
      return ReactNativeBrowserAdapter.INSTANCE.userAgent;
    },
    set(v: any) {
      ReactNativeBrowserAdapter.INSTANCE.userAgent = v;
    },
  });
}

// const adapter = require("@video/video-client-core").adapter;
// const ReactNativeDevice = require("./reactnative-device").ReactNativeDevice;

// adapter.implement(new ReactNativeDevice());
