import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { URDecoder } from '@ngraveio/bc-ur';
import { useAnimatedURQRCode, UseAnimatedURQRCodeOptions } from './useAnimatedURQRCode';

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

  return (
    <View style={[styles.wrapper, { backgroundColor, width: size + 24, height: size + 24 }]}>
      <QRCode
        value={parsed ? fragment : urString}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    borderRadius: 8,
  },
});
