import Jimp from 'jimp/es';

export class Image {
  width: number;
  height: number;
  data: Uint32Array;

  constructor(width: number, height: number, data: Uint32Array) {
    this.width = width;
    this.height = height;
    this.data = data;
  }

  private getPixelIndex(x: number, y: number): number {
    return x + (y * this.width);
  }

  blit(source: Image, x: number, y: number): void {
    for (let curX = 0; curX < source.width; curX++) {
      for (let curY = 0; curY < source.height; curY++) {
        const value = source.data[source.getPixelIndex(curX, curY)];
        this.data[this.getPixelIndex(curX + x, curY + y)] = value;
      }
    }
  }

  private async getJimpImage(): Promise<Jimp> {
    const image = await Jimp.create(this.width, this.height);

    this.data.forEach((d, i) => {
      image.bitmap.data.writeUInt32BE(d, i * 4);
    });

    return image;
  }

  async toFile(path: string): Promise<void> {
    const image = await this.getJimpImage();
    await image.writeAsync(path);
  }

  async toDataUrl(): Promise<string> {
    const image = await this.getJimpImage();
    return image.getBase64Async('image/png');
  }
}
