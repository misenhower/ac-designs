import { ColorPalette, Color } from '../src';

test('it contains the correct number of colors', () => {
  const palette = new ColorPalette;

  expect(palette.colors.length).toBe(16);
  expect(palette.colors[15]).toBe(Color.Transparent);
});

test('it can export to bytes', () => {
  const palette = new ColorPalette;
  palette.colors[0].acnlByte = 0x0F;
  palette.colors[1].acnlByte = 0x54;

  const expected = new Uint8Array(15);
  expected[0] = 0x0F;
  expected[1] = 0x54;

  expect(palette.acnlBytes).toStrictEqual(expected);
});

test('it can replace ACNL bytes', () => {
  const palette = new ColorPalette;

  const bytes = new Uint8Array(15);
  bytes[0] = 0x0F;
  bytes[1] = 0x54;

  palette.acnlBytes = bytes;

  expect(palette.colors[0].acnlByte).toBe(0x0F);
  expect(palette.colors[1].acnlByte).toBe(0x54);
});

test('it can be initialized with bytes', () => {
  const bytes = new Uint8Array(15);
  bytes[0] = 0x0F;
  bytes[1] = 0x54;

  const palette = new ColorPalette(bytes);

  expect(palette.colors[0].acnlByte).toBe(0x0F);
  expect(palette.colors[1].acnlByte).toBe(0x54);
});

test('bytes must be the correct size', () => {
  expect(() => new ColorPalette(new Uint8Array(1))).toThrow();
  expect(() => (new ColorPalette).acnlBytes = new Uint8Array(1)).toThrow();
});
