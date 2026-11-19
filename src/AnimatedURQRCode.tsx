import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { URDecoder } from '@ngraveio/bc-ur';
import { quietZone } from './quietZone';
import { useAnimatedURQRCode, UseAnimatedURQRCodeOptions } from './useAnimatedURQRCode';

const ECL = 'M';
const MARGIN = 12;

function parseUR(urString: string): { cbor: string; type: string } | null {
  try {
    const decoder = new URDecoder();
    decoder.receivePart(urString);
    if (!decoder.isSuccess()) {
      return null;
    }
    const ur = decoder.resultUR();
    return { cbor: ur.cbor.toString('hex'), type: ur.type };
  } catch {
    return null;
  }
}

export interface AnimatedURQRCodeProps extends UseAnimatedURQRCodeOptions {
  urString: string;
  size: number;
  color?: string;
  backgroundColor?: string;
}

export default function AnimatedURQRCode({
  urString,
  size,
  color = '#000000',
  backgroundColor = '#ffffff',
  capacity,
  interval,
}: AnimatedURQRCodeProps) {
  const parsed = useMemo(() => parseUR(urString), [urString]);
  const fragment = useAnimatedURQRCode(parsed?.cbor ?? '', parsed?.type ?? '', {
    capacity,
    interval,
  });
  const value = fragment || urString;
  const box = size + MARGIN * 2;
  const quiet = useMemo(() => quietZone(value, ECL, box), [value, box]);

  // The light margin is in the SVG: a system dark mode recolors a view's background, not the SVG.
  return (
    <View style={[styles.wrapper, { width: box, height: box }]}>
      <QRCode
        value={value}
        size={box}
        ecl={ECL}
        quietZone={quiet}
        color={color}
        backgroundColor={backgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});
