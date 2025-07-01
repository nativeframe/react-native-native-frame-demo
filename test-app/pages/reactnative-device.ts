 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from '@video/events-typed';
import { adapter, types } from '@video/video-client-core';
import { types as typesMS } from 'mediasoup-client';
import { AppState, Platform } from 'react-native';
import {
  mediaDevices,
  mediaDevices as WebRTCMediaDevices,
  MediaStream as WebRTCMediaStream,
  registerGlobals,
} from '@videomobile/react-native-webrtc';
import { ReactNativeBrowserAdapter } from '.';
import pkg from '../package.json';
import { rnLogger } from './reactnative-log';

// use react-native-webrtc classes as global.
registerGlobals();

// TODO allow DeviceScreenOrientation changed in ReactNativeDevice.
class DeviceScreenOrientation implements types.ScreenOrientation {
  angle = 0;
}

class DeviceLocalStorage implements types.LocalStorage {
  constructor() {
  }

  get length(): number {
    return Object.keys(this).length;
  }

  clear(): void {
    for (const key of Object.keys(this)) {
      delete this[key];
    }
    // AsyncStorage.clear();
  }

  getItem(key: string): string | null {
    return (this[key] as string) ?? null;
  }

  key(index: number): string | null {
    return Object.keys(this)[index] ?? null;
  }

  removeItem(key: string): void {
    delete this[key];
    // AsyncStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this[key] = value;
    // AsyncStorage.setItem(key, value);
  }

  [key: string]: unknown;
}

// For video-client integration the only value.
// used from NetworkInformation is 'type'.
class NetworkInfo implements types.NetworkInformation {
  downlink: number;

  downlinkMax: number;

  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | string;

  rtt: number;

  saveData: boolean;

  type: types.NetworkType;

  constructor() {
    this.downlink = 0;
    this.downlinkMax = 0;
    this.effectiveType = 'unknown';
    this.rtt = 0;
    this.saveData = false;
    this.type = 'unknown';
  }

  addEventListener(_type: 'change', _listener: (val: types.NetworkInformation) => void): void {}

  removeEventListener(_type: 'change', _listener: (val: types.NetworkInformation) => void): void {}
}

export class ReactNativeDevice
  extends EventEmitter
  implements
    types.DeviceAPI,
    types.MediaDeviceFeature,
    types.NetworkInformationFeature,
    types.ScreenOrientationFeature,
    types.MediaStreamFeature,
    types.DebuggingFeature
{
  isConnected = false;

  appStateVisible = true;

  networkInfo = new NetworkInfo();

  localStorage = new DeviceLocalStorage();

  MediaDevices: types.MediaDevicesConstructor = WebRTCMediaDevices;

  MediaStream: types.MediaStreamConstructor = WebRTCMediaStream;

  Uint8Array: Uint8ArrayConstructor = undefined as unknown as Uint8ArrayConstructor;

  features: Set<types.AdapterFeature> = new Set<types.AdapterFeature>([
    adapter.Feature.DEBUGGING,
    adapter.Feature.MEDIA_DEVICE,
    adapter.Feature.WEBRTC,
    adapter.Feature.HLSJS,
    adapter.Feature.LOCAL_STORAGE,
    adapter.Feature.MEDIA_STREAM,
    adapter.Feature.NETWORK_INFORMATION,
    adapter.Feature.SCREEN_ORIENTATION,
  ]);

  constructor() {
    super();
    // NetInfo.addEventListener((state) => {
    //   this.isConnected = state.isConnected ?? false;
    //   if (this.isConnected) {
    //     this.emit("online");
    //   } else {
    //     this.emit("offline");
    //   }
    //   switch (state.type) {
    //     case "none":
    //       this.networkInfo.type = "none";
    //       break;
    //     case "unknown":
    //       this.networkInfo.type = "unknown";
    //       break;
    //     case "cellular":
    //       this.networkInfo.type = "cellular";
    //       break;
    //     case "wifi":
    //       this.networkInfo.type = "wifi";
    //       break;
    //     case "bluetooth":
    //       this.networkInfo.type = "bluetooth";
    //       break;
    //     case "ethernet":
    //       this.networkInfo.type = "ethernet";
    //       break;
    //     case "wimax":
    //       this.networkInfo.type = "wimax";
    //       break;
    //     default:
    //       this.networkInfo.type = "other";
    //       break;
    //   }
    // });
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  processRtpCapabilities(
    direction: 'send' | 'recv',
    rtpCapabilities: typesMS.RtpCapabilities,
  ): typesMS.RtpCapabilities {
    // in the real world, some Android devices fail to encode H264, so let's filter it out
    if (direction === 'send' && Platform.OS === 'android') {
      return {
        ...rtpCapabilities,
        codecs: rtpCapabilities.codecs?.filter((c) => c.mimeType !== 'video/H264'),
      };
    }

    return rtpCapabilities;
  }

  console: adapter.Console = {
    assert(value: unknown, message?: string, ...optionalParams: unknown[]): void {},
    clear(): void {},
    count(label?: string): void {},
    countReset(label?: string): void {},
    debug(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.log(message, optionalParams);
    },
    log(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.log(message, optionalParams);
    },
    error(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.error(message, optionalParams);
    },
    info(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.log(message, optionalParams);
    },
    trace(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.log(message, optionalParams);
    },
    warn(message?: unknown, ...optionalParams: unknown[]): void {
      rnLogger.warn(message, optionalParams);
    },
    dir(obj: unknown, options?: unknown): void {},
    dirxml(...data: unknown[]): void {},
    group(...label: unknown[]): void {},
    groupCollapsed(...label: unknown[]): void {},
    groupEnd(): void {},
    table(tabularData: unknown, properties?: string[]): void {},
    time(label?: string): void {},
    timeEnd(label?: string): void {},
    timeLog(label?: string, ...data: unknown[]): void {},
    profile(label?: string): void {},
    profileEnd(label?: string): void {},
    timeStamp(label?: string): void {},
  };

  performance: adapter.Performance = {
    now(): number {
      return Date.now();
    },
  };

  supportsMediaStreamCapture(_el: unknown): boolean {
    return false;
  }

  captureStream(_el: unknown): null {
    return null;
  }

  applyUserInteractionHook(): void {}

  toggleCameraVisibility(msc: types.MediaStreamControllerAPI): void {}

  setTimeout(fn: () => void, ms: number): number {
    return global.setTimeout(fn, ms) as any;
  }

  setInterval(fn: () => void, ms: number): number {
    return global.setInterval(fn, ms) as any;
  }

  clearTimeout(id?: number): void {
    global.clearTimeout(id as any);
  }

  clearInterval(id?: number): void {
    global.clearInterval(id as any);
  }

  _handleAppStateChange = (nextAppState: string): void => {
    this.appStateVisible = nextAppState === 'active';
    this.emit('visibilitychange');
  };

  get appVersion(): string {
    return pkg.version;
  }

  get isIosDevice(): boolean {
    return Platform.OS === 'ios';
  }

  get isAndroidDevice(): boolean {
    return Platform.OS === 'android';
  }

  get isMobileDevice(): boolean {
    return true;
  }

  get browserInfo(): types.BrowserInfo {
    return {
      highEntropyValues: null,
      platform: this.platform,
      appVersion: this.appVersion,
      isMobileDevice: this.isMobileDevice,
      isIosDevice: this.isIosDevice,
      isAndroidDevice: this.isAndroidDevice,
      browserName: null,
      isSafari: false,
      isFirefox: false,
      isChrome: false,
      isEdge: false,
      isIE: false,
      isWindows: false,
    };
  }

  get connection(): types.NetworkInformation {
    return this.networkInfo;
  }

  readonly globals: Map<string, unknown> = new Map<string, unknown>();

  get hidden(): boolean {
    return !this.appStateVisible;
  }

  get mediaDevices(): types.MediaDevices {
    return mediaDevices;
  }

  get onLine(): boolean {
    return this.isConnected;
  }

  get platform(): string {
    return ReactNativeBrowserAdapter.INSTANCE.platform;
  }

  get screenOrientation(): types.ScreenOrientation {
    return new DeviceScreenOrientation();
  }

  get supportFullscreen(): boolean {
    return true;
  }

  get userAgent(): string {
    return Platform.OS;
  }

  addEventListener(type: string, listener: (event: Event) => void): void {
    this.on(type, listener);
  }

  removeEventListener(type: string, listener: (event: Event) => void): void {
    this.off(type, listener);
  }

  createVideoElement(): types.VideoElement {
    throw new Error('createVideoElement not implemented');
  }

  createVideoStub(): Promise<types.MediaStream> {
    return mediaDevices.enumerateDevices().then((_sourceInfos: types.MediaDeviceInfo[]) =>
      mediaDevices.getUserMedia({
        audio: true,
        video: {
          mandatory: {
            minWidth: ReactNativeBrowserAdapter.INSTANCE.defaultSettingsVideo.minWidth,
            minHeight: ReactNativeBrowserAdapter.INSTANCE.defaultSettingsVideo.minHeight,
            minFrameRate: ReactNativeBrowserAdapter.INSTANCE.defaultSettingsVideo.minFrameRate,
          },
          facingMode: ReactNativeBrowserAdapter.INSTANCE.defaultSettingsVideo.frontCamera ? 'user' : 'environment',
        },
      }),
    );
  }

  isCodecSupported(codec: string): boolean {
    rnLogger.log(`codec check: ${codec}`);
    throw new Error('isCodecSupported not implemented');
  }

  fetch(uri: string, request?: Partial<Request> | RequestInit): Promise<Response> {
    return global.fetch(uri, request) as any;
  }

  isImplements<K extends adapter.Feature, T extends adapter.Features[K]>(feature: K): this is this & T {
    return this.features.has(feature);
  }
}
