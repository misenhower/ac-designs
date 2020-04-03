import { QRData } from '../src/QRData';
import { sampleDesigns } from './fixtures/sampleDesignQrCodes';
import { DesignType } from '../src/DesignType';

test('normal designs use the correct number of bytes', () => {
  const qrData = new QRData(DesignType.Normal);
  expect(qrData.getBytes().length).toBe(620);
});

test('pro designs use the correct number of bytes', () => {
  for (let i = 0; i < 4; i++) {
    const qrData = new QRData(DesignType.Pro, i);
    expect(qrData.getBytes().length).toBe(540);
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

test('loadBytes must be passed byte data of the correct length', () => {
  let qrData = new QRData(DesignType.Normal);
  expect(() => qrData.loadBytes(new Uint8Array(620))).not.toThrow();
  expect(() => qrData.loadBytes(new Uint8Array(10))).toThrow();

  qrData = new QRData(DesignType.Pro, 0);
  expect(() => qrData.loadBytes(new Uint8Array(540))).not.toThrow();
  expect(() => qrData.loadBytes(new Uint8Array(10))).toThrow();
});

for (const sample of sampleDesigns) {
  test(`it can read property values: ${sample.description}`, () => {
    const qrData = QRData.fromBytes(sample.bytes, sample.index);

    expect(qrData.type).toBe(sample.type);
    expect(qrData.index).toBe(sample.index);

    expect(qrData.title).toBe(sample.properties.title);
    expect(qrData.playerId).toBe(sample.properties.playerId);
    expect(qrData.creator).toBe(sample.properties.creator);
    expect(qrData.sex).toBe(sample.properties.sex);
    expect(qrData.villageId).toBe(sample.properties.villageId);
    expect(qrData.village).toBe(sample.properties.village);
    expect(qrData.language).toBe(sample.properties.language);
    expect(qrData.country).toBe(sample.properties.country);
    expect(qrData.region).toBe(sample.properties.region);
    expect(qrData.paletteColors).toStrictEqual(sample.properties.paletteColors);
    expect(qrData.color).toBe(sample.properties.color);
    expect(qrData.looks).toBe(sample.properties.looks);
    expect(qrData.usage).toBe(sample.properties.usage);
    expect(qrData.colorData).toStrictEqual(sample.properties.colorData);

    expect(qrData.getBytes()).toStrictEqual(sample.bytes);
  });
}
