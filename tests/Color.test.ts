import { Color } from '../src';

test('it can convert to hex values', () => {
  expect((new Color(0x03)).hex).toBe('#F6A');
});

test('it can change byte values', () => {
  const color = new Color;

  color.byte = 0x66;

  expect(color.hex).toBe('#520');
});

test('it can change hex values', () => {
  const color = new Color;

  color.hex = '#F6A';

  expect(color.byte).toBe(0x03);
});

test('it handles invalid hex values', () => {
  const color = new Color;

  expect(() => color.hex = '#ABC').toThrow();
  expect(() => color.hex = 'ABC').toThrow();
  expect(() => color.hex = 'AABBCC').toThrow();
  expect(() => color.hex = 'invalid').toThrow();
  expect(() => color.hex = undefined).toThrow();
});

test('it handles valid hex values', () => {
  expect((new Color('#F6A')).byte).toBe(0x03);
  expect((new Color('#f6a')).byte).toBe(0x03);
  expect((new Color('#FF66AA')).byte).toBe(0x03);
  expect((new Color('#ff66aa')).byte).toBe(0x03);

  expect((new Color('F6A')).byte).toBe(0x03);
  expect((new Color('f6a')).byte).toBe(0x03);
  expect((new Color('FF66AA')).byte).toBe(0x03);
  expect((new Color('ff66aa')).byte).toBe(0x03);
});

test('it converts to rgba hex', () => {
  expect((new Color(0x03)).rgbaHex).toBe(0xFF66AAFF);
  expect((new Color(-1)).rgbaHex).toBeUndefined();
});
