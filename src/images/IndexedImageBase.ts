import { Image } from './Image';
import { ColorPalette } from '../ColorPalette';
import { IndexedImageSegment } from '..';

export abstract class IndexedImageBase {
  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  protected dataSize(): number {
    return this.width * this.height;
  }

  protected getPixelIndex(x: number, y: number): number {
    this.validateCoordinates(x, y);

    return x + (y * this.width);
  }

  abstract get colorPalette(): ColorPalette;

  abstract getColorIndexAt(x: number, y: number): number;
  abstract setColorIndexAt(x: number, y: number, value: number): void;

  get colorIndexes(): Uint8Array {
    const result = new Uint8Array(this.dataSize());

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        result[this.getPixelIndex(x, y)] = this.getColorIndexAt(x, y);
      }
    }

    return result;
  }

  set colorIndexes(value: Uint8Array) {
    this.validateDataSize(value);

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.setColorIndexAt(x, y, value[this.getPixelIndex(x, y)]);
      }
    }
  }

  getSegment(x: number, y: number, width: number, height: number): IndexedImageBase {
    return new IndexedImageSegment(this, x, y, width, height);
  }

  getImage(): Image {
    // Get the RGBA hex values for each color in the palette
    const palette = this.colorPalette.colors.map(c => c.hexNumber);
    palette.push(0x00000000); // The last palette index is reserved for transparency

    // Create an array of pixel data for the converted color data values
    const imageData = Uint32Array.from(this.colorIndexes, i => palette[i] as number);

    return new Image(this.width, this.height, imageData);
  }

  protected validateDataSize(data: Uint8Array): void {
    if (data.length !== this.dataSize()) {
      throw new Error(`Invalid data size, expected ${this.dataSize()} bytes, got ${data.length} bytes`);
    }
  }

  validateCoordinates(x: number, y: number): void {
    if (x < 0 || x >= this.width) {
      throw new Error(`x coordinate out of bounds, must be between 0 and ${this.width - 1}`);
    }
    if (y < 0 || y >= this.height) {
      throw new Error(`y coordinate out of bounds, must be between 0 and ${this.height - 1}`);
    }
  }
}
