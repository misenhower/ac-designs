import { Image } from './Image';
import { ImageFilter } from './ImageFilter';
import { Filter as XbrzFilter } from '../support/PixelFilterJS/xbrz.js';
import { Common as PixelFilterJSCommon } from '../support/PixelFilterJS/Common.js';

export class XbrzImageFilter implements ImageFilter {
  constructor(scale: 2 | 3 | 4 | 5 | 6 = 4) {
    this.scale = scale;
  }

  /**
   * The xBRZ scaling level.
   * Default value is 4x scaling.
   * Valid values are 2, 3, 4, 5, or 6.
   */
  scale: 2 | 3 | 4 | 5 | 6;

  async apply(image: Image): Promise<Image> {
    const filter = new XbrzFilter();

    const data = filter.Apply(image.data, image.width, image.height, this.scale, true);

    return new Image(PixelFilterJSCommon.SizeX, PixelFilterJSCommon.SizeY, data);
  }
}
