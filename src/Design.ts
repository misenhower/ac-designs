import { DesignType } from './DesignType';
import { DesignUsage } from './DesignUsage';
import { QRData } from './QRData';
import { setString, setNumber, setByteSubset, getString, getNumber, getByteSubset, calculateParity, compressImageData, extractImageData } from './support/ByteUtils';
import { ColorPalette } from './ColorPalette';
import { Image } from './images/Image';
import { IndexedImageBase } from './images/IndexedImageBase';
import { IndexedImage } from './images/IndexedImage';
import { CompositeIndexedImage } from './images/CompositeIndexedImage';
import { CompositeImageLayout } from './CompositeImageLayout';
import { Color } from './Color';

export class Design {
  constructor(usage = DesignUsage.CustomDesign) {
    this._usage = usage;
    this.refreshImageData();
  }

  static fromBytes(bytes: Uint8Array): Design {
    const design = new Design;
    design.loadBytes(bytes);
    return design;
  }

  static fromQRData(values: QRData | QRData[]): Design {
    const design = new Design;
    design.loadQRData(values);
    return design;
  }

  /** The design's title (UTF-16 encoded, up to 42 bytes). */
  title: string | undefined = undefined;

  /** The player ID (2 bytes). */
  playerId = 0;

  /** The creator's name (UTF-16 encoded, up to 18 bytes). */
  creator: string | undefined = undefined;

  /** The creator's sex (1 byte). */
  sex = 0;

  /** The village ID (2 bytes). */
  villageId = 0;

  /** The village name (UTF-16 encoded, up to 18 bytes). */
  village: string | undefined = undefined;

  /** The language ID (1 byte). */
  languageId = 1;

  /** The country ID (1 byte). */
  countryId = 49;

  /** The region ID (1 byte). */
  regionId = 11;

  /** The color palette (15 bytes). */
  colorPalette = new ColorPalette;

  /** The colors used in the palette for this design */
  get colors(): Array<Color> { return this.colorPalette.colors; }

  /** The color (this field's purpose is currently unknown) (1 byte). */
  color = 0;

  /** The looks (this field's purpose is currently unknown) (1 byte). */
  looks = 0;

  /** The usage. */
  private _usage = DesignUsage.CustomDesign;
  get usage(): DesignUsage { return this._usage; }
  set usage(value: DesignUsage) {
    this._usage = value;
    this.refreshImageData();
  }

  /** The usage ID. */
  get usageId(): number { return this.usage.id; }
  set usageId(value: number) {
    const usage = DesignUsage.fromId(value);
    if (!usage) {
      throw Error('Invalid usage ID');
    }

    this.usage = usage;
  }

  /** Each pixel's color index data. */
  private _imageData!: IndexedImage;
  get imageData(): IndexedImageBase { return this._imageData; }

  private refreshImageData(): void {
    const oldImageData = this._imageData;

    this._imageData = new IndexedImage(this.usage.imageDataPixelWidth, this.usage.imageDataPixelHeight, this);

    if (oldImageData) {
      const newIndexes = this._imageData.colorIndexes;
      const oldIndexes = oldImageData.colorIndexes;
      newIndexes.set(oldIndexes.subarray(0, newIndexes.length));
    }
  }

  // Export

  toBytes(): Uint8Array {
    if (this.title === undefined) {
      throw new Error('Title is required');
    }
    if (this.creator === undefined) {
      throw new Error('Creator name is required');
    }
    if (this.village === undefined) {
      throw new Error('Village name is required');
    }

    const data = new Uint8Array(this.usage.byteLength);
    setString(data, 0, 42, this.title);
    setNumber(data, 42, 2, this.playerId);
    setString(data, 44, 18, this.creator);
    setNumber(data, 62, 1, this.sex);
    setNumber(data, 64, 2, this.villageId);
    setString(data, 66, 18, this.village);
    setNumber(data, 84, 1, this.languageId);
    setNumber(data, 86, 1, this.countryId);
    setNumber(data, 87, 1, this.regionId);
    setByteSubset(data, 88, this.colorPalette.acnlBytes);
    setNumber(data, 103, 1, this.color);
    setNumber(data, 104, 1, this.looks);
    setNumber(data, 105, 1, this.usageId);
    setByteSubset(data, 108, compressImageData(this.imageData.colorIndexes));

    return data;
  }

  toQRData(): QRData[] {
    const bytes = this.toBytes();

    if (this.usage.type === DesignType.Pro) {
      const parity = calculateParity(bytes);
      return [
        QRData.fromBytes(getByteSubset(bytes, 0, 540), 0, parity),
        QRData.fromBytes(getByteSubset(bytes, 540, 540), 1, parity),
        QRData.fromBytes(getByteSubset(bytes, 1080, 540), 2, parity),
        QRData.fromBytes(getByteSubset(bytes, 1620, 540), 3, parity),
      ];
    }

    return [
      QRData.fromBytes(bytes),
    ];
  }

  // Import

  loadBytes(bytes: Uint8Array): void {
    this.loadMetadataBytes(bytes);
    this.imageData.colorIndexes = extractImageData(getByteSubset(bytes, 108, this.usage.imageDataByteLength));
  }

  private loadMetadataBytes(data: Uint8Array): void {
    this.title = getString(data, 0, 42);
    this.playerId = getNumber(data, 42, 2);
    this.creator = getString(data, 44, 18);
    this.sex = getNumber(data, 62, 1);
    this.villageId = getNumber(data, 64, 2);
    this.village = getString(data, 66, 18);
    this.languageId = getNumber(data, 84, 1);
    this.countryId = getNumber(data, 86, 1);
    this.regionId = getNumber(data, 87, 1);
    this.colorPalette.acnlBytes = getByteSubset(data, 88, 15);
    this.color = getNumber(data, 103, 1);
    this.looks = getNumber(data, 104, 1);
    this.usageId = getNumber(data, 105, 1);
  }

  loadQRData(values: QRData | QRData[]): void {
    if (values instanceof QRData) {
      values = [values];
    }

    // For normal QR data, we can just pass along the single QR code's data
    const normalData = values.find(d => d.type === DesignType.Normal);
    if (normalData) {
      return this.loadBytes(normalData.bytes);
    }

    // For pro data, we need to apply metadata from the first code and color data from all four
    values.filter(d => d.type === DesignType.Pro)
      .forEach(d => this.loadProQRData(d));
  }

  private loadProQRData(data: QRData): void {
    switch (data.index) {
      case 0:
        this.loadMetadataBytes(data.bytes);
        setByteSubset(this.imageData.colorIndexes, 0, extractImageData(getByteSubset(data.bytes, 108, 432)));
        break;
      case 1:
        setByteSubset(this.imageData.colorIndexes, 864, extractImageData(getByteSubset(data.bytes, 0, 540)));
        break;
      case 2:
        setByteSubset(this.imageData.colorIndexes, 1944, extractImageData(getByteSubset(data.bytes, 0, 540)));
        break;
      case 3:
        setByteSubset(this.imageData.colorIndexes, 3024, extractImageData(getByteSubset(data.bytes, 0, 536)));
        break;
    }
  }

  // Image conversion

  getIndexedImage(layout: CompositeImageLayout = CompositeImageLayout.Normal): IndexedImageBase {
    // For pro designs, lay out the image segments in a 64x64 image
    if (this.usage.type === DesignType.Pro) {
      // ACPatterns.com uses a slightly different image layout than the game itself
      if (layout === CompositeImageLayout.ACPatterns) {
        return (new CompositeIndexedImage(64, 64))
          .addSource(this.imageData.getSegment(0, 0, 32, 32), 0, 0)
          .addSource(this.imageData.getSegment(0, 32, 32, 32), 0, 32)
          .addSource(this.imageData.getSegment(0, 64, 32, 32), 32, 0)
          .addSource(this.imageData.getSegment(0, 96, 32, 32), 32, 32);
      }

      return (new CompositeIndexedImage(64, 64))
        .addSource(this.imageData.getSegment(0, 0, 32, 32), 32, 0)
        .addSource(this.imageData.getSegment(0, 32, 32, 32), 0, 0)
        .addSource(this.imageData.getSegment(0, 64, 32, 16), 0, 48)
        .addSource(this.imageData.getSegment(0, 80, 32, 16), 32, 48)
        .addSource(this.imageData.getSegment(0, 96, 32, 16), 32, 32)
        .addSource(this.imageData.getSegment(0, 112, 32, 16), 0, 32);
    }

    // For normal designs, we can just return the original image
    return this.imageData;
  }

  toImage(layout: CompositeImageLayout = CompositeImageLayout.Normal): Image {
    return this.getIndexedImage(layout).toImage();
  }
}
