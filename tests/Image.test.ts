import { promises as fs } from 'fs';
import { withFile } from 'tmp-promise';
import { Design, CompositeImageLayout } from '../src';
import { normalDesign } from './fixtures/normalDesign';
import { proDesign } from './fixtures/proDesign';

[normalDesign, proDesign].forEach((sample) => {
  test(`it can convert normal designs to image files: ${sample.description}`, async () => {
    const design = Design.fromBytes(sample.bytes);
    const image = design.getImage();

    const expected = await fs.readFile(`tests/fixtures/${sample.imagePngFile}`);

    await withFile(async ({ path }) => {
      await image.toFile(path);
      const actual = await fs.readFile(path);
      expect(actual).toStrictEqual(expected);
    });
  });
});

[normalDesign, proDesign].forEach((sample) => {
  test(`it can convert normal designs to image data URLs ${sample.description}`, () => {
    const design = Design.fromBytes(sample.bytes);
    const image = design.getImage();

    const result = image.toDataURL();

    expect(result).toBe(sample.imageBase64);
  });
});

test('it can use the acpatterns.com layout for pro designs', async () => {
  const design = Design.fromBytes(proDesign.bytes);
  const image = design.getImage(CompositeImageLayout.ACPatterns);

  const expectedFile = await fs.readFile(`tests/fixtures/${proDesign.imagePngFileAcpatterns}`);

  await withFile(async ({ path }) => {
    await image.toFile(path);
    const actual = await fs.readFile(path);
    expect(actual).toStrictEqual(expectedFile);
  });
});

test('it can use xBRZ to upscale images', async () => {
  const design = Design.fromBytes(normalDesign.bytes);
  const image = design.getImage();

  const expected = await fs.readFile('tests/fixtures/normal_image_xbrz_4x.png');

  await withFile(async ({ path }) => {
    const upscaledImage = await image.applyXbrzUpscaling();
    await upscaledImage.toFile(path);
    const actual = await fs.readFile(path);

    expect(actual).toStrictEqual(expected);
  });
});

test('it can use xBRZ to upscale images with a specified scale', async () => {
  const design = Design.fromBytes(normalDesign.bytes);
  const image = design.getImage();

  const expected = await fs.readFile('tests/fixtures/normal_image_xbrz_6x.png');

  await withFile(async ({ path }) => {
    const upscaledImage = await image.applyXbrzUpscaling(6);
    await upscaledImage.toFile(path);
    const actual = await fs.readFile(path);

    expect(actual).toStrictEqual(expected);
  });
});
