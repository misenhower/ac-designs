import { ColorPalette } from '../src/ColorPalette';

test('it contains the correct number of colors', () => {
  const palette = new ColorPalette;

  expect(palette.length).toBe(15);
});

test('it can export to bytes', () => {
  const palette = new ColorPalette;
  palette[0].byte = 0x0F;
  palette[1].byte = 0x54;

  const expected = new Uint8Array(15);
  expected[0] = 0x0F;
  expected[1] = 0x54;

  expect(palette.bytes).toStrictEqual(expected);
});

test('it can replace bytes', () => {
  const palette = new ColorPalette;

  const bytes = new Uint8Array(15);
  bytes[0] = 0x0F;
  bytes[1] = 0x54;

  palette.bytes = bytes;

  expect(palette[0].byte).toBe(0x0F);
  expect(palette[1].byte).toBe(0x54);
});

test('it can be initialized with bytes', () => {
  const bytes = new Uint8Array(15);
  bytes[0] = 0x0F;
  bytes[1] = 0x54;

  const palette = new ColorPalette(bytes);

  expect(palette[0].byte).toBe(0x0F);
  expect(palette[1].byte).toBe(0x54);
});
