import { IndexedImageBase } from './IndexedImageBase';
import { ColorPalette } from '../ColorPalette';

const TRANSPARENT_COLOR_INDEX = 15;

interface CompositeIndexedImageSource {
  image: IndexedImageBase;
  x: number;
  y: number;
}

export class CompositeIndexedImage extends IndexedImageBase {
  readonly sources: Array<CompositeIndexedImageSource> = [];

  addSource(image: IndexedImageBase, x: number, y: number): this {
    this.validateCoordinates(x, y);

    this.sources.push({ image, x, y });
    return this;
  }

  get colorPalette(): ColorPalette {
    // Just return the first source's color palette, since all sources should use the same palette
    return this.sources[0].image.colorPalette;
  }

  getSourceAt(x: number, y: number): CompositeIndexedImageSource | undefined {
    return this.sources.find(s =>
      s.x <= x && s.x + s.image.width - 1 >= x &&
      s.y <= y && s.y + s.image.height - 1 >= y
    );
  }

  getColorIndexAt(x: number, y: number): number {
    this.validateCoordinates(x, y);

    const source = this.getSourceAt(x, y);
    return (source) ? source.image.getColorIndexAt(x - source.x, y - source.y) : TRANSPARENT_COLOR_INDEX;
  }

  setColorIndexAt(x: number, y: number, value: number): void {
    this.validateCoordinates(x, y);

    const source = this.getSourceAt(x, y);
    if (source) {
      source.image.setColorIndexAt(x - source.x, y - source.y, value);
    }
  }
}
