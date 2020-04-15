import { promises as fs } from 'fs';
import { withFile } from 'tmp-promise';
import { QRData, DesignType } from '../src';
import { normalDesign } from './fixtures/normalDesign';
import { proDesign } from './fixtures/proDesign';

test('normal designs use the correct number of bytes', () => {
  const qrData = new QRData(DesignType.Normal);
  expect(qrData.bytes.length).toBe(620);
});

test('pro designs use the correct number of bytes', () => {
  for (let i = 0; i < 4; i++) {
    const qrData = new QRData(DesignType.Pro, i);
    expect(qrData.bytes.length).toBe(540);
  }
});

test('index must not be set for normal designs', () => {
  expect(() => new QRData(DesignType.Normal, 0)).toThrow();
});

test('index must be valid for pro designs', () => {
  expect(() => new QRData(DesignType.Pro)).toThrow();
  expect(() => new QRData(DesignType.Pro, -1)).toThrow();
  expect(() => new QRData(DesignType.Pro, 4)).toThrow();
});

test('must specify a valid design type', () => {
  expect(() => new QRData('invalid' as DesignType)).toThrow();
});

test('fromBytes detects normal designs from bytes', () => {
  const qrData = QRData.fromBytes(new Uint8Array(620));
  expect(qrData.type).toBe(DesignType.Normal);
  expect(qrData.index).toBeUndefined();
});

test('fromBytes detects pro designs from bytes', () => {
  const qrData = QRData.fromBytes(new Uint8Array(540), 1);
  expect(qrData.type).toBe(DesignType.Pro);
  expect(qrData.index).toBe(1);
});

test('fromBytes throws on invalid data lengths', () => {
  expect(() => QRData.fromBytes(new Uint8Array(10))).toThrow();
});

test('replacement byte array must be the correct length', () => {
  let qrData = new QRData(DesignType.Normal);
  expect(() => qrData.bytes = new Uint8Array(620)).not.toThrow();
  expect(() => qrData.bytes = new Uint8Array(540)).toThrow();
  expect(() => qrData.bytes = new Uint8Array(10)).toThrow();

  qrData = new QRData(DesignType.Pro, 0);
  expect(() => qrData.bytes = new Uint8Array(540)).not.toThrow();
  expect(() => qrData.bytes = new Uint8Array(620)).toThrow();
  expect(() => qrData.bytes = new Uint8Array(10)).toThrow();
});

[normalDesign, proDesign].forEach((design) => {
  design.qrCodeDatas.forEach((qrCodeData, i) => {
    test(`it can generate a QR code image: ${design.description}, index: ${i}`, async () => {
      const index = (design.type === DesignType.Pro) ? i : undefined;
      const qrData = QRData.fromBytes(qrCodeData.bytes, index, design.parity);

      const expected = await fs.readFile(`tests/fixtures/${qrCodeData.outputPngFile}`);

      await withFile(async ({ path }) => {
        await qrData.toImage().toFile(path);
        const actual = await fs.readFile(path);
        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
