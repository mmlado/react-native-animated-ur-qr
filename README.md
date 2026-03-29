# react-native-animated-ur-qr

[![CI](https://github.com/mmlado/react-native-animated-ur-qr/actions/workflows/ci.yml/badge.svg)](https://github.com/mmlado/react-native-animated-ur-qr/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/react-native-animated-ur-qr)](https://www.npmjs.com/package/react-native-animated-ur-qr)
[![npm downloads](https://img.shields.io/npm/dm/react-native-animated-ur-qr)](https://www.npmjs.com/package/react-native-animated-ur-qr)
[![license](https://img.shields.io/npm/l/react-native-animated-ur-qr)](./LICENSE)

Animated [BC-UR](https://github.com/BlockchainCommons/Research/blob/master/papers/bcr-2020-005-ur.md) QR code component and hook for React Native. Supports multi-part UR encoding for transmitting large payloads (Bitcoin PSBTs, Ethereum signing requests, etc.) over QR code to airgapped devices.

## Installation

```sh
npm install react-native-animated-ur-qr
```

### Peer dependencies

```sh
npm install @ngraveio/bc-ur react-native-qrcode-svg react-native-svg
```

## Usage

### Component

The simplest way — renders an animated QR code from a UR string:

```tsx
import AnimatedURQRCode from 'react-native-animated-ur-qr';

<AnimatedURQRCode
  urString="ur:crypto-psbt/..."
  size={300}
/>
```

Single-fragment URs are displayed statically — no unnecessary animation.

### Hook (bring your own renderer)

Use `useAnimatedURQRCode` if you want to control the QR rendering yourself:

```tsx
import { useAnimatedURQRCode } from 'react-native-animated-ur-qr';
import QRCode from 'react-native-qrcode-svg';

function MyQR({ cbor, type }: { cbor: string; type: string }) {
  const fragment = useAnimatedURQRCode(cbor, type);
  return <QRCode value={fragment} size={300} />;
}
```

## API

### `<AnimatedURQRCode />`

| Prop | Type | Default | Description |
|---|---|---|---|
| `urString` | `string` | required | A valid UR string (`ur:type/...`) |
| `size` | `number` | required | QR code size in pixels |
| `color` | `string` | `#000000` | QR code foreground color |
| `backgroundColor` | `string` | `#ffffff` | QR code background color |
| `interval` | `number` | `200` | Frame duration in milliseconds |
| `capacity` | `number` | `400` | Max fragment size in bytes |

### `useAnimatedURQRCode(cbor, type, options?)`

| Parameter | Type | Description |
|---|---|---|
| `cbor` | `string` | CBOR payload as a hex string |
| `type` | `string` | UR type (e.g. `crypto-psbt`, `eth-sign-request`) |
| `options.interval` | `number` | Frame duration in milliseconds (default: `200`) |
| `options.capacity` | `number` | Max fragment size in bytes (default: `400`) |

Returns the current UR fragment string to render as a QR code.

## License

MIT — see [LICENSE](./LICENSE).

Animated QR logic adapted from [@keystonehq/animated-qr](https://github.com/KeystoneHQ/keystone-sdk-usb/tree/master/packages/animated-qr) (MIT).
