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
   * The design's title (UTF-16 encoded, up to 42 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get title(): string | undefined {
    return this.hasMetadata() ? this.getString(0, 42) : undefined;
  }

  set title(value: string | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setString(0, 42, value as string);
  }

  /**
   * The player ID (2 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get playerId(): number | undefined {
    return this.hasMetadata() ? this.getNumber(42, 2) : undefined;
  }

  set playerId(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(42, 2, value as number);
  }

  /**
   * The creator's name (UTF-16 encoded, up to 18 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get creator(): string | undefined {
    return this.hasMetadata() ? this.getString(44, 18) : undefined;
  }

  set creator(value: string | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setString(44, 18, value as string);
  }

  /**
   * The creator's sex (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get sex(): number | undefined {
    return this.hasMetadata() ? this.getNumber(62, 1) : undefined;
  }

  set sex(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(62, 1, value as number);
  }

  /**
   * The village ID (2 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get villageId(): number | undefined {
    return this.hasMetadata() ? this.getNumber(64, 2) : undefined;
  }

  set villageId(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(64, 2, value as number);
  }

  /**
   * The village name (UTF-16 encoded, up to 18 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get village(): string | undefined {
    return this.hasMetadata() ? this.getString(66, 18) : undefined;
  }

  set village(value: string | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setString(66, 18, value as string);
  }

  /**
   * The language ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get language(): number | undefined {
    return this.hasMetadata() ? this.getNumber(84, 1) : undefined;
  }

  set language(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(84, 1, value as number);
  }

  /**
   * The country ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get country(): number | undefined {
    return this.hasMetadata() ? this.getNumber(86, 1) : undefined;
  }

  set country(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(86, 1, value as number);
  }

  /**
   * The region ID (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get region(): number | undefined {
    return this.hasMetadata() ? this.getNumber(87, 1) : undefined;
  }

  set region(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(87, 1, value as number);
  }

  /**
   * The palette colors (15 bytes).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get paletteColors(): Uint8Array | undefined {
    return this.hasMetadata() ? this.getByteSubset(88, 15) : undefined;
  }

  set paletteColors(value: Uint8Array | undefined) {
    this.throwIfInvalidMetadataSetter(value);

    if ((value as Uint8Array).length !== 15) {
      throw new Error('Invalid data length');
    }

    this.setByteSubset(88, value as Uint8Array);
  }

  /**
   * The color (this field's purpose is currently unknown) (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get color(): number | undefined {
    return this.hasMetadata() ? this.getNumber(103, 1) : undefined;
  }

  set color(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(103, 1, value as number);
  }

  /**
   * The looks (this field's purpose is currently unknown) (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get looks(): number | undefined {
    return this.hasMetadata() ? this.getNumber(104, 1) : undefined;
  }

  set looks(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(104, 1, value as number);
  }

  /**
   * The usage (1 byte).
   * Only supported for normal design QR codes and the first QR code for pro designs.
   */
  get usage(): number | undefined {
    return this.hasMetadata() ? this.getNumber(105, 1) : undefined;
  }

  set usage(value: number | undefined) {
    this.throwIfInvalidMetadataSetter(value);
    this.setNumber(105, 1, value as number);
  }

  /**
   * Each pixel's color data.
   * For pro designs, this only contains a segment of the full design's pixel data.
   * Total size varies depending on QR code type and index.
   */
  get colorData(): Uint8Array {
    return this.getByteSubset(...this.colorDataByteRange());
  }

  set colorData(value: Uint8Array) {
    const range = this.colorDataByteRange();

    if ((value as Uint8Array).length !== range[1]) {
      throw new Error('Invalid data length');
    }

    this.setByteSubset(range[0], value as Uint8Array);
  }

  private colorDataByteRange(): [number, number] {
    if (this.type === DesignType.Normal) {
      return [108, 512];
    }

    switch (this.index) {
      case 0:
        return [108, 432];
      case 1:
      case 2:
        return [0, 540];
      case 3:
        return [0, 536];
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

  private throwIfInvalidMetadataSetter(value: unknown): void {
    if (!this.hasMetadata()) {
      throw new Error('This QR data type has no metadata');
    }

    if (value === undefined || value === null) {
      throw new Error('Value is required');
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

  private setByteSubset(offset: number, data: Uint8Array): void {
    this.data.set(data, offset);
  }

  private setString(offset: number, length: number, value: string): void{
    // Convert the string to UTF-16 LE
    // NOTE: This may not truncate multi-code unit characters properly. Code points
    // that require more than 2 bytes may be malformed.
    const bytes = new Uint8Array(length);
    for (let i = 0; i < value.length && i * 2 < bytes.length; i++) {
      const charCode = value.charCodeAt(i);
      bytes[i * 2] = charCode;
      bytes[i * 2 + 1] = charCode >> 8;
    }

    this.setByteSubset(offset, bytes);
  }

  private setNumber(offset: number, length: number, value: number): void{
    for (let i = 0; i < length; i++) {
      this.data[offset + i] = value >> (8 * (length - i - 1));
    }
  }
}
