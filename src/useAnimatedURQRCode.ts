// Animated QR logic adapted from @keystonehq/animated-qr (MIT License)
// https://github.com/KeystoneHQ/keystone-sdk-usb/tree/master/packages/animated-qr
import { useEffect, useMemo, useState } from 'react';
import { UR, UREncoder } from '@ngraveio/bc-ur';

const MAX_FRAGMENT_LENGTH = 400;
const DEFAULT_INTERVAL = 200;

export interface UseAnimatedURQRCodeOptions {
  capacity?: number;
  interval?: number;
}

export function useAnimatedURQRCode(
  cbor: string,
  type: string,
  { capacity = MAX_FRAGMENT_LENGTH, interval = DEFAULT_INTERVAL }: UseAnimatedURQRCodeOptions = {},
): string {
  const urEncoder = useMemo(() => {
    if (!cbor || !type) {
      return null;
    }
    return new UREncoder(new UR(Buffer.from(cbor, 'hex'), type), capacity);
  }, [cbor, type, capacity]);

  const [currentFragment, setCurrentFragment] = useState(() =>
    urEncoder ? urEncoder.nextPart().toUpperCase() : '',
  );

  useEffect(() => {
    if (!urEncoder || urEncoder.fragmentsLength === 1) {
      return;
    }
    const id = setInterval(() => setCurrentFragment(urEncoder.nextPart().toUpperCase()), interval);
    return () => clearInterval(id);
  }, [urEncoder, interval]);

  return currentFragment;
}
