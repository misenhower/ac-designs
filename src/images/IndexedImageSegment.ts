import { IndexedImageBase } from './IndexedImageBase';
import { ColorPalette } from '../ColorPalette';

export class IndexedImageSegment extends IndexedImageBase {
  readonly source: IndexedImageBase;
  readonly x: number;
  readonly y: number;

  constructor(source: IndexedImageBase, x: number, y: number, width: number, height: number) {
    super(width, height);

    source.validateCoordinates(x, y);
    if (width < 0 || width > source.width - x) {
      throw new Error(`Invalid width, must be between 0 and ${x + source.width}`);
    }
    if (height < 0 || height > source.height - y) {
      throw new Error(`Invalid height, must be between 0 and ${y + source.height}`);
    }

    this.source = source;
    this.x = x;
    this.y = y;
  }

  get colorPalette(): ColorPalette {
    return this.source.colorPalette;
  }

  getColorIndexAt(x: number, y: number): number {
    return this.source.getColorIndexAt(x + this.x, y + this.y);
  }

  setColorIndexAt(x: number, y: number, value: number): void {
    this.source.setColorIndexAt(x + this.x, y + this.y, value);
  }
}
