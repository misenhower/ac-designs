import { Color } from '../src';

test('it can convert to hex values', () => {
  expect((new Color(0x03)).hex).toBe('#FF66AA');
});

test('it can change byte values', () => {
  const color = new Color;

  color.acnlByte = 0x66;

  expect(color.hex).toBe('#552200');
});

test('it can change hex values', () => {
  const color = new Color;

  color.hex = '#FF66AA';

  expect(color.acnlByte).toBe(0x03);
});

test('it handles invalid hex values', () => {
  const color = new Color;

  expect(() => color.hex = '#ABC').toThrow();
  expect(() => color.hex = 'ABC').toThrow();
  expect(() => color.hex = 'AABBCC').toThrow();
  expect(() => color.hex = 'invalid').toThrow();
  expect(() => color.hex = undefined).toThrow();

  // Valid ACNL colors must be specified as 6-character hex values
  expect(() => color.hex = '#F6A').toThrow();
});

test('it handles valid hex values', () => {
  expect((new Color('#FF66AA')).acnlByte).toBe(0x03);
  expect((new Color('#ff66aa')).acnlByte).toBe(0x03);

  expect((new Color('FF66AA')).acnlByte).toBe(0x03);
  expect((new Color('ff66aa')).acnlByte).toBe(0x03);
});

test('it converts to rgba hex', () => {
  expect((new Color(0x03)).hexNumber).toBe(0xFF66AAFF);
  expect((new Color(-2)).hexNumber).toBeUndefined();
});

test('it handles transparency', () => {
  const color = new Color(-1);

  expect(color.acnlByte).toBe(-1);
  expect(color.hex).toBe('#00000000');
  expect(color.hexNumber).toBe(0x00000000);
});


test('it provides an immutable static transparent color', () => {
  expect(Color.Transparent).toBeInstanceOf(Color);

  expect(Color.Transparent.acnlByte).toBe(-1);
  expect(Color.Transparent.hex).toBe('#00000000');
  expect(Color.Transparent.hexNumber).toBe(0x00000000);

  const color = Color.Transparent as Color;

  expect(() => color.acnlByte = 0).toThrow();
});
