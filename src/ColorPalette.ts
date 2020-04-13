import { Color } from './Color';

const COLOR_PALETTE_LENGTH = 15;

export class ColorPalette {
  public readonly colors = new Array<Color>(COLOR_PALETTE_LENGTH);

  constructor(acnlBytes?: Uint8Array) {
    for (let i = 0; i < COLOR_PALETTE_LENGTH; i++) {
      this.colors[i] = new Color;
    }

    if (acnlBytes) {
      this.acnlBytes = acnlBytes;
    }
  }

  get acnlBytes(): Uint8Array {
    return new Uint8Array(this.colors.map(c => c.acnlByte));
  }

  set acnlBytes(value: Uint8Array) {
    if (value.length !== COLOR_PALETTE_LENGTH) {
      throw new Error('Invalid color palette length');
    }

    for (let i = 0; i < COLOR_PALETTE_LENGTH; i++) {
      this.colors[i].acnlByte = value[i];
    }
  }
}
