import { IndexedImageBase } from './IndexedImageBase';
import { Design } from '../Design';
import { ColorPalette } from '../ColorPalette';

export class IndexedImage extends IndexedImageBase {
  design?: Design;

  constructor(width: number, height: number, design?: Design) {
    super(width, height);

    this._colorIndexes = new Uint8Array(this.dataSize());
    this.design = design;
  }

  get colorPalette(): ColorPalette {
    if (!this.design) {
      throw new Error('Missing design');
    }

    return this.design.colorPalette;
  }

  getColorIndexAt(x: number, y: number): number {
    this.validateCoordinates(x, y);

    return this._colorIndexes[this.getPixelIndex(x, y)];
  }

  setColorIndexAt(x: number, y: number, value: number): void {
    this.validateCoordinates(x, y);

    this._colorIndexes[this.getPixelIndex(x, y)] = value;
  }

  // Override colorIndexes to refer directly to our _colorIndexes array.
  // There's no need to use the base class's derived array since this is the root store for the image.
  private _colorIndexes: Uint8Array;
  get colorIndexes(): Uint8Array { return this._colorIndexes; }
  set colorIndexes(value: Uint8Array) {
    this.validateDataSize(value);

    this._colorIndexes = value;
  }
}
