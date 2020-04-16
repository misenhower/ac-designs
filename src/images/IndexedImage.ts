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

    this.notifyVue();
  }

  /**
   * This notifies Vue that the data contained within this object has changed
   * (if this object has been added to a Vue component/made reactive).
   *
   * This is a bit of a hack which is needed because Vue 2.x doesn't make
   * TypedArrays (like Uint8Array) reactive by default. Array<number> doesn't
   * work either because setting values via array index can't be picked up by
   * Vue 2.x's reactivity system (https://vuejs.org/v2/guide/reactivity.html).
   *
   * Making the entire pixel array reactive comes with a significant performance
   * penalty in certain cases, so it's probably better overall to keep Design
   * classes out of Vue's data management and update fields/draw images manually.
   * This may be removed in the future.
   */
  private notifyVue(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const self = this as any;

    if (self.__ob__ && self.__ob__.dep && typeof self.__ob__.dep.notify === 'function') {
      self.__ob__.dep.notify();
    }
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
