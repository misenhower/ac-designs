import { readFileSync } from 'fs';
import { withFile } from 'tmp-promise';
import { Design } from '../src/Design';
import { normalDesign } from './fixtures/normalDesign';
import { proDesign } from './fixtures/proDesign';

[normalDesign, proDesign].forEach((sample) => {
  test(`it can convert normal designs to image files: ${sample.description}`, async () => {
    const design = Design.fromBytes(sample.bytes);
    const image = design.getImage();

    const expected = readFileSync(`tests/fixtures/${sample.imagePngFile}`);

    await withFile(async ({ path }) => {
      await image.toFile(path);
      const actual = readFileSync(path);
      expect(actual).toStrictEqual(expected);
    });
  });
});

[normalDesign, proDesign].forEach((sample) => {
  test(`it can convert normal designs to image data URLs ${sample.description}`, async () => {
    const design = Design.fromBytes(sample.bytes);
    const image = design.getImage();

    const result = await image.toDataUrl();

    expect(result).toBe(sample.imageBase64);
  });
});
