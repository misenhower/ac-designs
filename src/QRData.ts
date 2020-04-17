import { DesignType } from './DesignType';
import QRCode, { QRCodeSegment } from 'qrcode';
import { Image } from './images/Image';
import { createCanvas } from 'canvas';

const BYTE_LENGTH_NORMAL = 620;
const BYTE_LENGTH_PRO = 540;

export class QRData {
  readonly type: DesignType;
  index?: number;
  parity?: number;

  constructor(type: DesignType, index?: number, parity?: number, bytes?: Uint8Array) {
    // Make sure we have valid parameters
    if (type === DesignType.Normal) {
      if (index !== undefined || parity !== undefined) {
        throw new Error('Index and parity must be set to "undefined" for normal designs');
      }
    } else if (type === DesignType.Pro) {
      if (index === undefined || index < 0 || index > 3) {
        throw new Error('Must specify a QR code index between 0-3 for pro designs');
      }
    } else {
      throw new Error('Invalid design type');
    }

    this.type = type;
    this.index = index;
    this.parity = parity;
    this.bytes = bytes || new Uint8Array(this.byteLength());
  }

  static fromBytes(bytes: Uint8Array, index?: number, parity?: number): QRData {
    if (bytes.length === BYTE_LENGTH_NORMAL) {
      return new QRData(DesignType.Normal, index, parity, bytes);
    } else if (bytes.length === BYTE_LENGTH_PRO) {
      return new QRData(DesignType.Pro, index, parity, bytes);
    }

    throw new Error('Invalid data length');
  }

  private byteLength(): number {
    return (this.type === DesignType.Pro) ? BYTE_LENGTH_PRO : BYTE_LENGTH_NORMAL;
  }

  private _bytes!: Uint8Array;
  /**
   * The underlying bytes for this QR data segment.
   */
  get bytes(): Uint8Array { return this._bytes; }
  set bytes(value: Uint8Array) {
    if (value.length !== this.byteLength()) {
      throw new Error('Invalid data length');
    }
    this._bytes = value;
  }

  // QR code conversion

  private qrSegments(): QRCodeSegment[] {
    const segments = [{ mode: 'byte', data: this.bytes }] as Array<unknown>;

    if (this.type === DesignType.Pro) {
      if (this.index === undefined) {
        throw new Error('Index is required');
      }
      if (this.parity === undefined) {
        throw new Error('Parity byte is required');
      }

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
