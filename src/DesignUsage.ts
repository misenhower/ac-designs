import { DesignType } from './DesignType';
import { ImageSize } from './ImageSize';

interface DesignUsageParameters {
  id: number;
  description: string;
  type: DesignType;
  imageSize: ImageSize;
}

export class DesignUsage {
  readonly id: number;
  readonly description: string;
  readonly type: DesignType;
  readonly imageSize: ImageSize;

  constructor(params: DesignUsageParameters) {
    this.id = params.id;
    this.description = params.description;
    this.type = params.type;
    this.imageSize = params.imageSize;
  }

  get width(): number {
    return 32;
  }

  get height(): number {
    return (this.imageSize === ImageSize.Large) ? 128 : 32;
  }

  get pixelCount(): number {
    return this.width * this.height;
  }

  get imageDataByteLength(): number {
    return this.pixelCount / 2;
  }

  get byteLength(): number {
    return (this.imageSize === ImageSize.Large) ? 2160 : 620;
  }

  get qrCodeCount(): number {
    return (this.imageSize === ImageSize.Large) ? 4 : 1;
  }

  public static readonly LongSleeveDress = new DesignUsage({
    id: 0,
    description: 'Long-sleeve dress',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly ShortSleeveDress = new DesignUsage({
    id: 1,
    description: 'Short-sleeve dress',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly SleevelessDress = new DesignUsage({
    id: 2,
    description: 'Sleeveless dress',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly LongSleeveShirt = new DesignUsage({
    id: 3,
    description: 'Long-sleeve shirt',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly ShortSleeveShirt = new DesignUsage({
    id: 4,
    description: 'Short-sleeve shirt',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly SleevelessShirt = new DesignUsage({
    id: 5,
    description: 'Sleeveless shirt',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly HornedHat = new DesignUsage({
    id: 6,
    description: 'Horned hat',
    type: DesignType.Pro,
    imageSize: ImageSize.Normal,
  });

  public static readonly KnitCap = new DesignUsage({
    id: 7,
    description: 'Knit cap',
    type: DesignType.Pro,
    imageSize: ImageSize.Normal,
  });

  public static readonly Standee = new DesignUsage({
    id: 8,
    description: 'Standee',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  public static readonly CustomDesign = new DesignUsage({
    id: 9,
    description: 'Custom design',
    type: DesignType.Normal,
    imageSize: ImageSize.Normal,
  });

  public static readonly UnknownUsage010 = new DesignUsage({
    id: 10,
    description: 'Unknown Usage #10',
    type: DesignType.Normal,
    imageSize: ImageSize.Normal,
  });

  public static readonly UnknownUsage011 = new DesignUsage({
    id: 11,
    description: 'Unknown Usage #11',
    type: DesignType.Normal,
    imageSize: ImageSize.Normal,
  });

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
