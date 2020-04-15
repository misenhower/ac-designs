import { DesignType } from './DesignType';

export class DesignUsage {
  public readonly id: number;
  public readonly type: DesignType;
  public readonly description: string;

  constructor(id: number, type: DesignType, description: string) {
    this.id = id;
    this.type = type;
    this.description = description;
  }

  get byteLength(): number {
    return (this.type === DesignType.Pro) ? 2160 : 620;
  }

  get colorDataPixelWidth(): number {
    return 32;
  }

  get colorDataPixelHeight(): number {
    return (this.type === DesignType.Pro) ? 128 : 32;
  }

  get colorDataPixelCount(): number {
    return this.colorDataPixelWidth * this.colorDataPixelHeight;
  }

  get colorDataByteLength(): number {
    return this.colorDataPixelCount / 2;
  }

  public static readonly LongSleeveDress = new DesignUsage(0, DesignType.Pro, 'Long-sleeve dress');
  public static readonly ShortSleeveDress = new DesignUsage(1, DesignType.Pro, 'Short-sleeve dress');
  public static readonly SleevelessDress = new DesignUsage(2, DesignType.Pro, 'Sleeveless dress');
  public static readonly LongSleeveShirt = new DesignUsage(3, DesignType.Pro, 'Long-sleeve shirt');
  public static readonly ShortSleeveShirt = new DesignUsage(4, DesignType.Pro, 'Short-sleeve shirt');
  public static readonly SleevelessShirt = new DesignUsage(5, DesignType.Pro, 'Sleeveless shirt');
  public static readonly HornedHat = new DesignUsage(6, DesignType.Pro, 'Horned hat');
  public static readonly KnitCap = new DesignUsage(7, DesignType.Pro, 'Knit cap');
  public static readonly Standee = new DesignUsage(8, DesignType.Pro, 'Standee');
  public static readonly CustomDesign = new DesignUsage(9, DesignType.Normal, 'Custom design');
  public static readonly UnknownUsage010 = new DesignUsage(10, DesignType.Normal, 'Unknown Usage #10');
  public static readonly UnknownUsage011 = new DesignUsage(11, DesignType.Normal, 'Unknown Usage #11');

  public static readonly all: DesignUsage[] = [
    DesignUsage.LongSleeveDress,
    DesignUsage.ShortSleeveDress,
    DesignUsage.SleevelessDress,
    DesignUsage.LongSleeveShirt,
    DesignUsage.ShortSleeveShirt,
    DesignUsage.SleevelessShirt,
    DesignUsage.HornedHat,
    DesignUsage.KnitCap,
    DesignUsage.Standee,
    DesignUsage.CustomDesign,
    DesignUsage.UnknownUsage010,
    DesignUsage.UnknownUsage011,
  ];

  public static fromId(id: number): DesignUsage | undefined {
    return this.all.find(d => d.id === id);
  }
}
