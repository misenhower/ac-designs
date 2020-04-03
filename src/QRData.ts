import { DesignType } from './DesignType';

const BYTE_LENGTH_NORMAL = 620;
const BYTE_LENGTH_PRO = 540;

export class QRData {
  public readonly type: DesignType;
  public readonly index?: number;
  private readonly data: Uint8Array;

  constructor(type: DesignType, index?: number) {
    // Make sure we have valid parameters
    if (type === DesignType.Normal) {
      if (index !== undefined) {
        throw new Error('Index must be set to "undefined" for normal designs');
      }
    } else if (type === DesignType.Pro) {
      if (index === undefined || index < 0 || index > 3) {
        throw new Error('Must specify a QR code index between 0-3 for pro designs');
      }
    }

    this.type = type;
    this.index = index;
    this.data = this.getNewBuffer();
  }

  static fromBytes(data: Uint8Array, index?: number): QRData {
    let result;

    if (data.length === BYTE_LENGTH_NORMAL) {
      result = new QRData(DesignType.Normal);
    } else if (data.length === BYTE_LENGTH_PRO) {
      result = new QRData(DesignType.Pro, index);
    } else {
      throw new Error('Invalid data length');
    }

    return result.loadBytes(data);
  }

  // Properties

  /**
   * The design's title (up to 42 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get title(): string | undefined {
    return this.hasMetadata() ? this.getString(0, 42) : undefined;
  }

  /**
   * The player ID (2 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get playerId(): number | undefined {
    return this.hasMetadata() ? this.getNumber(42, 2) : undefined;
  }

  /**
   * The creator's name (up to 18 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get creator(): string | undefined {
    return this.hasMetadata() ? this.getString(44, 18) : undefined;
  }

  /**
   * The creator's sex (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get sex(): number | undefined {
    return this.hasMetadata() ? this.getNumber(62, 1) : undefined;
  }

  /**
   * The village ID (2 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get villageId(): number | undefined {
    return this.hasMetadata() ? this.getNumber(64, 2) : undefined;
  }

  /**
   * The village name (up to 18 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get village(): string | undefined {
    return this.hasMetadata() ? this.getString(66, 18) : undefined;
  }

  /**
   * The language ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get language(): number | undefined {
    return this.hasMetadata() ? this.getNumber(84, 1) : undefined;
  }

  /**
   * The country ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get country(): number | undefined {
    return this.hasMetadata() ? this.getNumber(86, 1) : undefined;
  }

  /**
   * The region ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get region(): number | undefined {
    return this.hasMetadata() ? this.getNumber(87, 1) : undefined;
  }

  /**
   * The palette colors (15 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get paletteColors(): Uint8Array | undefined {
    return this.hasMetadata() ? this.getByteSubset(88, 15) : undefined;
  }

  /**
   * The color (this field's purpose is currently unknown) (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get color(): number | undefined {
    return this.hasMetadata() ? this.getNumber(103, 1) : undefined;
  }

  /**
   * The looks (this field's purpose is currently unknown) (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get looks(): number | undefined {
    return this.hasMetadata() ? this.getNumber(104, 1) : undefined;
  }

  /**
   * The usage (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get usage(): number | undefined {
    return this.hasMetadata() ? this.getNumber(105, 1) : undefined;
  }

  /**
   * Each pixel's color data.
   * For pro designs, this only contains a segment of the full design's pixel data.
   * Total size varies depending on QR code type and index.
   */
  get colorData(): Uint8Array {
    if (this.type === DesignType.Normal) {
      return this.getByteSubset(108, 512);
    }

    switch (this.index) {
      case 0:
        return this.getByteSubset(108, 432);
      case 1:
      case 2:
        return this.getByteSubset(0, 540);
      case 3:
        return this.getByteSubset(0, 536);
    }

    throw new Error('Invalid parameters');
  }

  // Byte data

  loadBytes(data: Uint8Array): this {
    if (data.length !== this.data.length) {
      throw new Error('Invalid data length');
    }

    this.data.set(data);
    return this;
  }

  getBytes(): Uint8Array {
    return this.data;
  }

  // Other helpers

  private hasMetadata(): boolean {
    return (
      this.type === DesignType.Normal ||
      (this.type === DesignType.Pro && this.index === 0)
    );
  }

  private throwIfNoMetadata(): void {
    if (!this.hasMetadata()) {
      throw new Error('This QR data type has no metadata');
    }
  }

  private getNewBuffer(): Uint8Array {
    if (this.type === DesignType.Normal) {
      return new Uint8Array(BYTE_LENGTH_NORMAL);
    } else if (this.type === DesignType.Pro) {
      return new Uint8Array(BYTE_LENGTH_PRO);
    }

    throw new Error('Invalid design type');
  }

  private getByteSubset(offset: number, length: number): Uint8Array {
    return this.data.subarray(offset, offset + length);
  }

  private getString(offset: number, length: number): string {
    const bytes = this.getByteSubset(offset, length);
    const result = new TextDecoder('utf-16le', { ignoreBOM: true }).decode(bytes);
    return result.includes('\u0000') ? result.split('\u0000', 1)[0] : result;
  }

  private getNumber(offset: number, length: number): number {
    return this.getByteSubset(offset, length)
      .reduce((result, b) => (result << 8) + b, 0);
  }
}
