import { Color } from './Color';

const COLOR_PALETTE_LENGTH = 15;

export class ColorPalette extends Array<Color> {
  constructor(acnlBytes?: Uint8Array) {
    super(COLOR_PALETTE_LENGTH);

    for (let i = 0; i < COLOR_PALETTE_LENGTH; i++) {
      this[i] = new Color;
    }

    // Note: Calling .map creates a new instance of this ColorPalette class
    // with the number of elements passed as the first argument.
    // We have to make sure the argument is actually a Uint8Array instance.
    if (acnlBytes instanceof Uint8Array) {
      this.acnlBytes = acnlBytes;
    }
  }

  get acnlBytes(): Uint8Array {
    return new Uint8Array(this.map(c => c.acnlByte));
  }

  set acnlBytes(value: Uint8Array) {
    if (value.length !== COLOR_PALETTE_LENGTH) {
      throw new Error('Invalid color palette length');
    }

    for (let i = 0; i < COLOR_PALETTE_LENGTH; i++) {
      this[i].acnlByte = value[i];
    }
  }
}
