export class Color {
  constructor(value?: string | number) {
    if (typeof value === 'string') {
      this.hex = value;
    } else if (typeof value === 'number') {
      this.acnlByte = value;
    }
  }

  static Transparent = Object.freeze(new Color(-1));

  /** Animal Crossing New Leaf color code. */
  acnlByte = 0;

  /** Hex string representation of the color (e.g., "#FFAA00"). */
  get hex(): string | undefined {
    return this.byteToHex(this.acnlByte);
  }

  set hex(value: string | undefined) {
    if (value === undefined) {
      throw new Error('Hex value is required');
    }

    const byte = this.hexToByte(value);
    if (byte === undefined) {
      throw new Error(`Invalid hex color value: ${value}`);
    }

    this.acnlByte = byte;
  }

  /** Hex number representation of the color with the alpha channel (e.g., 0xFFAA00FF). */
  get hexNumber(): number | undefined {
    // Special case for a "fake" transparent color
    if (this.acnlByte === -1) {
      return 0x00000000;
    }

    const hex = this.hex;
    if (hex === undefined) {
      return undefined;
    }

    return (
      (parseInt(hex.slice(1, 3), 16) << 24) + // Red
      (parseInt(hex.slice(3, 5), 16) << 16) + // Green
      (parseInt(hex.slice(5, 7), 16) << 8) + // Blue
      0xFF // Alpha channel (fully opaque)
    ) >>> 0; // Convert back to an unsigned 32-bit int
  }

  private byteToHex(value: number): string | undefined {
    // Special case for a "fake" transparent color
    if (value === -1) {
      return '#00000000';
    }

    return Color.newLeafColorCodes[value];
  }

  private hexToByte(value: string): number | undefined {
    const normalized = this.normalizeHex(value);
    const index = (normalized) ? Color.newLeafColorCodes.indexOf(normalized) : undefined;
    return (index !== undefined && index >= 0) ? index : undefined;
  }

  private normalizeHex(value: string): string | undefined {
    const pieces = /^#?([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})?$/i.exec(value);
    if (pieces) {
      return `#${pieces[1]}${pieces[2]}${pieces[3]}`.toUpperCase();
    }
  }

  // eslint-disable-next-line no-sparse-arrays
  static readonly newLeafColorCodes = [
    '#FFEEFF', '#FF99AA', '#EE5599', '#FF66AA', '#FF0066', '#BB4477', '#CC0055', '#990033', '#552233',,,,,,,
    '#FFFFFF',
    '#FFBBCC', '#FF7777', '#DD3311', '#FF5544', '#FF0000', '#CC6666', '#BB4444', '#BB0000', '#882222',,,,,,,
    '#EEEEEE',
    '#DDCCBB', '#FFCC66', '#DD6622', '#FFAA22', '#FF6600', '#BB8855', '#DD4400', '#BB4400', '#663311',,,,,,,
    '#DDDDDD',
    '#FFEEDD', '#FFDDCC', '#FFCCAA', '#FFBB88', '#FFAA88', '#DD8866', '#BB6644', '#995533', '#884422',,,,,,,
    '#CCCCCC',
    '#FFCCFF', '#EE88FF', '#CC66DD', '#BB88CC', '#CC00FF', '#996699', '#8800AA', '#550077', '#330044',,,,,,,
    '#BBBBBB',
    '#FFBBFF', '#FF99FF', '#DD22BB', '#FF55EE', '#FF00CC', '#885577', '#BB0099', '#880066', '#550044',,,,,,,
    '#AAAAAA',
    '#DDBB99', '#CCAA77', '#774433', '#AA7744', '#993300', '#773322', '#552200', '#331100', '#221100',,,,,,,
    '#999999',
    '#FFFFCC', '#FFFF77', '#DDDD22', '#FFFF00', '#FFDD00', '#CCAA00', '#999900', '#887700', '#555500',,,,,,,
    '#888888',
    '#DDBBFF', '#BB99EE', '#6633CC', '#9955FF', '#6600FF', '#554488', '#440099', '#220066', '#221133',,,,,,,
    '#777777',
    '#BBBBFF', '#8899FF', '#3333AA', '#3355EE', '#0000FF', '#333388', '#0000AA', '#111166', '#000022',,,,,,,
    '#666666',
    '#99EEBB', '#66CC77', '#226611', '#44AA33', '#008833', '#557755', '#225500', '#113322', '#002211',,,,,,,
    '#555555',
    '#DDFFBB', '#CCFF88', '#88AA55', '#AADD88', '#88FF00', '#AABB99', '#66BB00', '#559900', '#336600',,,,,,,
    '#444444',
    '#BBDDFF', '#77CCFF', '#335599', '#6699FF', '#1177FF', '#4477AA', '#224477', '#002277', '#001144',,,,,,,
    '#333333',
    '#AAFFFF', '#55FFFF', '#0088BB', '#55BBCC', '#00CCFF', '#4499AA', '#006688', '#004455', '#002233',,,,,,,
    '#222222',
    '#CCFFEE', '#AAEEDD', '#33CCAA', '#55EEBB', '#00FFCC', '#77AAAA', '#00AA99', '#008877', '#004433',,,,,,,
    '#000000',
    '#AAFFAA', '#77FF77', '#66DD44', '#00FF00', '#22DD22', '#55BB55', '#00BB00', '#008800', '#224422',,,,,,,
    ,
  ];

  static readonly newLeafColors = Color.newLeafColorCodes.filter(c => c);
}
