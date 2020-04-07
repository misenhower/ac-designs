export class Color {
  constructor(value?: string | number) {
    if (typeof value === 'string') {
      this.hex = value;
    } else if (typeof value === 'number') {
      this.byte = value;
    }
  }

  byte = 0;

  get hex(): string | undefined {
    return this.byteToHex(this.byte);
  }

  set hex(value: string | undefined) {
    if (value === undefined) {
      throw new Error('Hex value is required');
    }

    const byte = this.hexToByte(value);
    if (byte === undefined) {
      throw new Error('Invalid hex color value');
    }

    this.byte = byte;
  }

  private byteToHex(value: number): string | undefined {
    return Color.colorCodes[value];
  }

  private hexToByte(value: string): number | undefined {
    const normalized = this.normalizeHex(value);
    const index = (normalized) ? Color.colorCodes.indexOf(normalized) : undefined;
    return (index !== undefined && index >= 0) ? index : undefined;
  }

  private normalizeHex(value: string): string | undefined {
    const pieces = /#?([0-9A-F])\1?([0-9A-F])\2?([0-9A-F])\3?/i.exec(value);
    if (pieces) {
      return `#${pieces[1]}${pieces[2]}${pieces[3]}`.toUpperCase();
    }
  }

  static readonly colorCodes = [
    '#FEF', '#F9A', '#E59', '#F6A', '#F06', '#B47', '#C05', '#903', '#523',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#FFF',

    '#FBC', '#F77', '#D31', '#F54', '#F00', '#C66', '#B44', '#B00', '#822',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#EEE',

    '#DCB', '#FC6', '#D62', '#FA2', '#F60', '#B85', '#D40', '#B40', '#631',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#DDD',

    '#FED', '#FDC', '#FCA', '#FB8', '#FA8', '#D86', '#B64', '#953', '#842',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#CCC',

    '#FCF', '#E8F', '#C6D', '#B8C', '#C0F', '#969', '#80A', '#507', '#304',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#BBB',

    '#FBF', '#F9F', '#D2B', '#F5E', '#F0C', '#857', '#B09', '#806', '#504',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#AAA',

    '#DB9', '#CA7', '#743', '#A74', '#930', '#732', '#520', '#310', '#210',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#999',

    '#FFC', '#FF7', '#DD2', '#FF0', '#FD0', '#CA0', '#990', '#870', '#550',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#888',

    '#DBF', '#B9E', '#63C', '#95F', '#60F', '#548', '#409', '#206', '#213',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#777',

    '#BBF', '#89F', '#33A', '#35E', '#00F', '#338', '#00A', '#116', '#002',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#666',

    '#9EB', '#6C7', '#261', '#4A3', '#083', '#575', '#250', '#132', '#021',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#555',

    '#DFB', '#CF8', '#8A5', '#AD8', '#8F0', '#AB9', '#6B0', '#590', '#360',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#444',

    '#BDF', '#7CF', '#359', '#69F', '#17F', '#47A', '#247', '#027', '#014',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#333',

    '#AFF', '#5FF', '#08B', '#5BC', '#0CF', '#49A', '#068', '#045', '#023',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#222',

    '#CFE', '#AED', '#3CA', '#5EB', '#0FC', '#7AA', '#0A9', '#087', '#043',
    undefined, undefined, undefined, undefined, undefined, undefined,
    '#000',

    '#AFA', '#7F7', '#6D4', '#0F0', '#2D2', '#5B5', '#0B0', '#080', '#242',
    undefined, undefined, undefined, undefined, undefined, undefined,
    undefined,
  ];
}
