import { create, type QRCodeErrorCorrectionLevel } from 'qrcode';

// ISO/IEC 18004 asks for four light modules on every side.
export const QUIET_ZONE_MODULES = 4;

/** The `quietZone` that gives `value`, drawn `size` wide by react-native-qrcode-svg, four light modules a side. */
export function quietZone(value: string, ecl: QRCodeErrorCorrectionLevel, size: number): number {
  const modules = create(value, { errorCorrectionLevel: ecl }).modules.size;
  return (QUIET_ZONE_MODULES * size) / modules;
}
