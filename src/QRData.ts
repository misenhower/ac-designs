import QRCode, { QRCodeSegment } from 'qrcode';
import { Image } from './images/Image';
import { createCanvas } from 'canvas';

export class QRData {
  bytes: Uint8Array;
  index?: number;
  parity?: number;

  constructor(bytes: Uint8Array, index?: number, parity?: number) {
    this.bytes = bytes;
    this.index = index;
    this.parity = parity;
  }

  // QR code conversion

  private qrSegments(): QRCodeSegment[] {
    const segments = [{ mode: 'byte', data: this.bytes }] as Array<unknown>;

    if (this.index !== undefined && this.parity !== undefined) {
      segments.unshift({ mode: 'structuredappend', data: { position: this.index, total: 3, parity: this.parity } });
    }

    return segments as unknown as QRCodeSegment[];
  }

  toImage(): Image {
    const canvas = createCanvas(1, 1);
    QRCode.toCanvas(canvas, this.qrSegments());
    return Image.fromCanvas(canvas);
  }
}
