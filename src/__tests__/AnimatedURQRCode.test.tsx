import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { UR, UREncoder } from '@ngraveio/bc-ur';
import jsQR from 'jsqr';
import { create } from 'qrcode';
import AnimatedURQRCode from '../AnimatedURQRCode';
import { QUIET_ZONE_MODULES } from '../quietZone';

type QRProps = {
  value: string;
  size: number;
  ecl: 'L' | 'M' | 'Q' | 'H';
  quietZone: number;
  color: string;
  backgroundColor: string;
};

let mockQRProps: QRProps | null = null;

jest.mock('react-native-qrcode-svg', () => (props: QRProps) => {
  mockQRProps = props;
  return null;
});

jest.mock('react-native', () => {
  const mockReact = jest.requireActual('react');
  return {
    StyleSheet: { create: (styles: object) => styles },
    View: ({ style, children }: { style: object[]; children: React.ReactNode }) =>
      mockReact.createElement(
        'div',
        { 'data-testid': 'wrapper', 'data-style': JSON.stringify(Object.assign({}, ...style)) },
        children,
      ),
  };
});

function urString(cbor: string): string {
  return UREncoder.encodeSinglePart(new UR(Buffer.from(cbor, 'hex'), 'bytes'));
}

/** The SVG as react-native-qrcode-svg draws it: the code in `size` units, the quiet zone around it. */
function drawnCode() {
  const { value, size, ecl, quietZone } = mockQRProps!;
  const { modules } = create(value, { errorCorrectionLevel: ecl });
  const quietModules = (quietZone * modules.size) / size;
  const scale = 4;
  const quiet = Math.floor(quietModules + 1e-9);
  const width = (modules.size + quiet * 2) * scale;
  const pixels = new Uint8ClampedArray(width * width * 4).fill(255);
  for (let y = 0; y < modules.size; y++) {
    for (let x = 0; x < modules.size; x++) {
      if (!modules.get(y, x)) {
        continue;
      }
      for (let dy = 0; dy < scale; dy++) {
        for (let dx = 0; dx < scale; dx++) {
          const pixel = ((y + quiet) * scale + dy) * width + (x + quiet) * scale + dx;
          pixels.fill(0, pixel * 4, pixel * 4 + 3);
        }
      }
    }
  }
  return { quietModules, text: jsQR(pixels, width, width)?.data };
}

describe('AnimatedURQRCode', () => {
  beforeEach(() => {
    mockQRProps = null;
    jest.useFakeTimers();
  });
  afterEach(() => jest.useRealTimers());

  it('draws a single-part UR with four light modules a side', () => {
    render(<AnimatedURQRCode urString={urString('deadbeef')} size={300} />);
    const code = drawnCode();
    expect(code.quietModules).toBeCloseTo(QUIET_ZONE_MODULES);
    expect(code.text).toBe(mockQRProps!.value);
    expect(code.text!.startsWith('UR:BYTES/')).toBe(true);
  });

  it('draws every frame of an animated UR with four light modules a side', () => {
    render(
      <AnimatedURQRCode
        urString={urString('deadbeef'.repeat(100))}
        size={300}
        capacity={100}
        interval={200}
      />,
    );
    const frames = new Set<string>();
    for (let frame = 0; frame < 12; frame++) {
      const code = drawnCode();
      expect(code.quietModules).toBeCloseTo(QUIET_ZONE_MODULES);
      expect(code.text).toBe(mockQRProps!.value);
      frames.add(code.text!);
      act(() => {
        jest.advanceTimersByTime(200);
      });
    }
    expect(frames.size).toBe(12);
  });

  it('draws the margin in the SVG, not as a view background', () => {
    render(<AnimatedURQRCode urString={urString('deadbeef')} size={300} />);
    const style = JSON.parse(screen.getByTestId('wrapper').dataset.style!);
    expect(style).toMatchObject({ width: 324, height: 324 });
    expect(style.backgroundColor).toBeUndefined();
    expect(mockQRProps).toMatchObject({
      size: 324,
      color: '#000000',
      backgroundColor: '#ffffff',
    });
  });

  it('passes its colors to the code', () => {
    render(
      <AnimatedURQRCode
        urString={urString('deadbeef')}
        size={300}
        color="#112233"
        backgroundColor="#fafafa"
      />,
    );
    expect(mockQRProps).toMatchObject({ color: '#112233', backgroundColor: '#fafafa' });
  });
});
