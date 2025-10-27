# react-native-native-frame-demo
This is a demo of how to use **@video/react-native-sdk**. 

## Running the demo
```bash
cd test-app
yarn

yarn android
yarn ios
```
<table>
  <tr>
    <td><img src="img/screenshot-1.png" alt="Screenshot 1" width="300"/></td>
    <td><img src="img/screenshot-2.png" alt="Screenshot 2" width="300"/></td>
  </tr>
</table>

## New to React Native?

If you're new to React Native, we recommend reviewing the official [React Native Getting Started Guide](https://reactnative.dev/docs/getting-started) to familiarize yourself with the framework and development environment setup.

# Using @video/react-native-sdk

React Native SDK for video streaming.

## Features

- 📹 **Live video streaming** with WebRTC and HLS support
- 📡 **Live broadcasting** with camera preview and optional controls
- 📱 **Cross-platform** - iOS and Android support
- 🔄 **Automatic fallback** between WebRTC and HLS

## Installation

### 📦 Install SDK and Dependencies

#### yarn  
```bash
# Install SDK
yarn add @video/react-native-sdk

# Install required peer dependencies with specific versions
yarn add react-native-video@^6.16.1 \
         react-native-webrtc@^124.0.0 \
         @react-native-picker/picker@^2.11.1 \
         @react-native-async-storage/async-storage@^2.2.0 \
         @react-native-community/netinfo@^11.4.1 \
         react-native-safe-area-context@^5.5.1 \
         react-native-screens@^4.11.1
```

#### npm
```bash
# Install SDK
npm install @video/react-native-sdk

# Install required peer dependencies with specific versions
npm install react-native-video@^6.16.1 \
           react-native-webrtc@^124.0.0 \
           @react-native-picker/picker@^2.11.1 \
           @react-native-async-storage/async-storage@^2.2.0 \
           @react-native-community/netinfo@^11.4.1 \
           react-native-safe-area-context@^5.5.1 \
           react-native-screens@^4.11.1
```

#### pnpm
```bash
# Install SDK  
pnpm add @video/react-native-sdk

# Install required peer dependencies with specific versions
pnpm add react-native-video@^6.16.1 \
         react-native-webrtc@^124.0.0 \
         @react-native-picker/picker@^2.11.1 \
         @react-native-async-storage/async-storage@^2.2.0 \
         @react-native-community/netinfo@^11.4.1 \
         react-native-safe-area-context@^5.5.1 \
         react-native-screens@^4.11.1
```

### 🍎 iOS Additional Setup
```bash
cd ios && pod install
```

---

## 🔧 NPM Scope Configuration

**Important:** Before installing the SDK, developers must configure their npm scope to access the `@video` packages from our registry.

### Configure NPM Registry

Add the following configuration to your project:

#### For yarn users
Create or update `.yarnrc.yml` in your project root:
```yaml
npmScopes:
  video:
    npmRegistryServer: https://npm-packages.nativeframe.com/
```

#### For npm users  
Run the following command or add to `.npmrc`:
```bash
npm config set @video:registry https://npm-packages.nativeframe.com/
```

#### For pnpm users
Add to `.npmrc` in your project root:
```
@video:registry=https://npm-packages.nativeframe.com/
```

---

## ⚡ One-Line Installation

#### yarn
```bash  
yarn add @video/react-native-sdk react-native-video@^6.16.1 react-native-webrtc@^124.0.0 @react-native-picker/picker@^2.11.1 @react-native-async-storage/async-storage@^2.2.0 @react-native-community/netinfo@^11.4.1 react-native-safe-area-context@^5.5.1 react-native-screens@^4.11.1
```

#### npm (7+)
```bash
npm install @video/react-native-sdk react-native-video@^6.16.1 react-native-webrtc@^124.0.0 @react-native-picker/picker@^2.11.1 @react-native-async-storage/async-storage@^2.2.0 @react-native-community/netinfo@^11.4.1 react-native-safe-area-context@^5.5.1 react-native-screens@^4.11.1
```

#### pnpm
```bash
pnpm add @video/react-native-sdk react-native-video@^6.16.1 react-native-webrtc@^124.0.0 @react-native-picker/picker@^2.11.1 @react-native-async-storage/async-storage@^2.2.0 @react-native-community/netinfo@^11.4.1 react-native-safe-area-context@^5.5.1 react-native-screens@^4.11.1
```

## Quick Start

See:
- [test-app/PagePlayer.tsx](test-app/PagePlayer.tsx)
- [test-app/PageEncoder.tsx](test-app/PageEncoder.tsx)

### Sample code
```javascript
import React from 'react';
import { View } from 'react-native';
import { ManifestPlayer, ManifestPlayerVideo, ManifestPlayerVideoCustomControls, getSession } from '@video/react-native-sdk';

export default function App() {
  const mySession = getSession({
    backendEndpoint: '<your backend endpoint>', displayName: 'React-Native Demo', 
    streamName: 'react-native-demo'
  });

  return (
    <View style={{ flex: 1 }}>
      <ManifestPlayer 
        manifestUrl="<manifest URL>"
        session={mySession}
        autoplay
      >
        {({ manifestPlayer }) => (
          <ManifestPlayerVideo
            manifestPlayer={manifestPlayer}
            showControls={true}
            showDriver={false}
            showQualitySelect={false}
            style={{ backgroundColor: '#000' }}
          />
        )}
      </ManifestPlayer>
    </View>
  );
}
```

### Broadcasting Example
```javascript
import React from 'react';
import { View } from 'react-native';
import { Encoder, getSession } from '@video/react-native-sdk';

export default function BroadcastApp() {
  const mySession = getSession({
    backendEndpoint: '<your backend endpoint>', displayName: 'React-Native Demo', 
    streamName: 'react-native-demo'
  });

  return (
    <View style={{ flex: 1 }}>
      <Encoder session={mySession} />
    </View>
  );
}
```

## API Reference

### ManifestPlayer

The main component for video stream playing.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `manifestUrl` | `string` | - | Manifest URL for streaming |
| `session` | `Session` | - | **Required** - User session for authentication |
| `autoplay` | `boolean` | `false` | Start playback automatically when ready |
| `muted` | `boolean` | `false` | Start with audio muted |

#### Example
```javascript
<ManifestPlayer 
  manifestUrl="<manifest URL>"
  session={session}
  autoplay
  muted={false}
>
  {({ manifestPlayer }) => (
    <ManifestPlayerVideo manifestPlayer={manifestPlayer} />
  )}
</ManifestPlayer>
```

### ManifestPlayerVideo

Video player UI component with controls.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `manifestPlayer` | `ManifestPlayer` | - | **Required** - Player instance |
| `style` | `ViewStyle` | - | Style object |
| `showControls` | `boolean` | `false` | Show play/pause/refresh controls (webrtc only) |
| `showDriver` | `boolean` | `false` | Show current driver info |
| `showQualitySelect` | `boolean` | `false` | Show quality selection dropdown |
| `fixedWidth` | `boolean` | `false` | Use fixed width layout |

### ManifestPlayerVideoCustomControls

Video player component that allows custom overlay UI elements.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `manifestPlayer` | `ManifestPlayer` | - | **Required** - Player instance |
| `style` | `ViewStyle` | - | Style object |
| `key` | `string` | - | React key prop |
| `children` | `ReactNode` | - | Custom UI elements to overlay on the video |
| `progressUpdateInterval` | `number` | - | Progress updates interval |
| `resizeMode` | `string` | - | Video resize mode |
| `preventsDisplaySleepDuringVideoPlayback` | `boolean` | `true` | Prevents device screen sleeping |
| `allowsExternalPlayback` | `boolean` | `true` | Enabled external device playback |
| `paused` | `boolean` | `false` | Video playback state |
| `muted` | `boolean` | `false` | Audio muting |
| `rate` | `number` | `1.0` | Playback speed |
| `onProgress` | `function` | - | Callback for playback progress |
| `onLoad` | `function` | - | Callback for video load |
| `onEnd` | `function` | - | Callback for video end |
| `onError` | `function` | - | Callback for video error |
| `onFullscreenPlayerDidDismiss` | `function` | - | Callback for fullscreen player |
| `onPlaybackStateChanged` | `function` | - | Callback for playback |

#### Example
```javascript
<ManifestPlayerVideoCustomControls 
  style={{ backgroundColor: '#000000' }}
  manifestPlayer={manifestPlayer}
  onLoad={() => console.log('loaded')}
>
  {/* custom UI */}
  <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#F01B1B' }}>
    <Text style={{ color: 'white' }}>Custom Overlay</Text>
  </View>
</ManifestPlayerVideoCustomControls>
```

<img src="img/screenshot-3.png" alt="Custom UI Screenshot" width="300"/>

### Encoder

Component for live video broadcasting with camera preview.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `session` | `Session` | - | **Required** - User session for authentication |

#### Example
```javascript
import { Encoder, getSession } from '@video/react-native-sdk';
const mySession = getSession({
   backendEndpoint: '<your backend endpoint>', displayName: 'React-Native Demo', 
   streamName: 'react-native-demo'
});

<Encoder session={mySession} />
```

**Features:**
- Live camera preview
- One-tap broadcasting 
- Front camera setup by default

### Utilities

#### getSession

Creates and returns a session object for authentication with the video streaming service.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `backendEndpoint` | `string` | Yes | Your backend endpoint URL |
| `displayName` | `string` | Yes | Display name for the session |
| `streamName` | `string` | Yes | Unique stream identifier |

**Returns:** `Session` object

## ⚠️ Important Notes

- **Do not skip other dependencies** - Needed for React Native's native linking requirements
- **Version compatibility is critical** - Use the specified versions for best results  
- **iOS users must run `pod install`** after installing native modules
- **SDK requires camera/microphone permissions** on device

## 🔧 Troubleshooting

### Video not showing with manifestUrl

**Possible causes:**
1. Manifest URL is incorrect or unreachable
2. Network permissions not configured

## Requirements

- **React Native:** >= 0.78.0
- **React:** >= 18.2.0
- **iOS:** >= 15.1
- **Android:** >= API 24 (Android 7.0)

## Permissions in your app that uses the sdk

### iOS (ios/[your app]/Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for video streaming</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app needs microphone access for audio streaming</string>
```

### Android (android/app/src/main/AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.INTERNET" />
```
