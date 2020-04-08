import { Image } from './Image';

export interface ImageFilter {
  apply(image: Image): Promise<Image>;
}
