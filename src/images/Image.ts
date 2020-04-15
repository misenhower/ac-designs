import { promises as fs } from 'fs';
import { Canvas, CanvasRenderingContext2D, ImageData, createCanvas, createImageData } from 'canvas';
import { ImageFilter } from './ImageFilter';
import { XbrzImageFilter } from './XbrzImageFilter';
import { convertPixelsFrom32To8 } from '../support/ByteUtils';

export class Image {
  width: number;
  height: number;
  data: Uint32Array;

  constructor(width: number, height: number, data: Uint32Array) {
    this.width = width;
    this.height = height;
    this.data = data;
  }

  // Filters

  applyFilter(filter: ImageFilter): Promise<Image> {
    return filter.apply(this);
  }

  applyXbrzUpscaling(scale: 2 | 3 | 4 | 5 | 6 = 4): Promise<Image> {
    return this.applyFilter(new XbrzImageFilter(scale));
  }

  // Output

  toCanvas(): Canvas | HTMLCanvasElement;
  toCanvas(canvas: Canvas | HTMLCanvasElement): Canvas | HTMLCanvasElement;
  toCanvas(canvas: Canvas | HTMLCanvasElement, x: number, y: number): Canvas | HTMLCanvasElement;
  toCanvas(context: CanvasRenderingContext2D): Canvas | HTMLCanvasElement;
  toCanvas(context: CanvasRenderingContext2D, x: number, y: number): Canvas | HTMLCanvasElement;
  toCanvas(value?: Canvas | HTMLCanvasElement | CanvasRenderingContext2D, x = 0, y = 0): Canvas | HTMLCanvasElement {
    const context = this.resolveContext(value);
    context.putImageData(this.getImageData(), x, y);

    return context.canvas;
  }

  toDataURL(mimeType: 'image/png' | 'image/jpeg' = 'image/png'): string {
    return this.toCanvas().toDataURL(mimeType);
  }

  toBlob(mimeType: 'image/png' | 'image/jpeg'): Promise<Blob> {
    return new Promise((resolve, reject) => {
      (this.toCanvas() as HTMLCanvasElement).toBlob((blob) => {
        if (blob) resolve(blob);
        else reject();
      }, mimeType);
    });
  }

  toBuffer(mimeType: 'image/png' | 'image/jpeg' = 'image/png'): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      (this.toCanvas() as Canvas).toBuffer((err, result) => {
        if (err) reject(err);
        else resolve(result);
      }, mimeType as 'image/png');
    });
  }

  async toFile(path: string, mimeType?: 'image/png' | 'image/jpeg'): Promise<void> {
    if (!mimeType) {
      mimeType = /\.jpe?g$/i.test(path) ? 'image/jpeg' : 'image/png';
    }

    const buffer = await this.toBuffer(mimeType);
    return fs.writeFile(path, buffer);
  }

  private resolveCanvas(canvas?: Canvas | HTMLCanvasElement): Canvas | HTMLCanvasElement {
    return (canvas) ? canvas : createCanvas(this.width, this.height);
  }

  private resolveContext(value?: Canvas | HTMLCanvasElement | CanvasRenderingContext2D): CanvasRenderingContext2D {
    if (value && value instanceof CanvasRenderingContext2D) {
      return value;
    }

    return this.resolveCanvas(value).getContext('2d') as CanvasRenderingContext2D;
  }

  private getImageData(): ImageData {
    const data = convertPixelsFrom32To8(this.data);
    return createImageData(data, this.width, this.height);
  }
}
