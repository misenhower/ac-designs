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

test('it handles special characters', () => {
  const qrData = new QRData(DesignType.Normal);

  qrData.title = 'あ';
  expect(qrData.title).toBe('あ');
  expect(qrData.getBytes().subarray(0, 2)).toStrictEqual(new Uint8Array([0x42, 0x30]));

  qrData.title = '👍';
  expect(qrData.title).toBe('👍');
  expect(qrData.getBytes().subarray(0, 4)).toStrictEqual(new Uint8Array([0x3D, 0xD8, 0x4D, 0xDC]));
});

test('it overwrites old data', () => {
  const qrData = new QRData(DesignType.Normal);

  qrData.title = 'abcd';
  expect(qrData.getBytes().subarray(0, 8))
    .toStrictEqual(new Uint8Array([0x61, 0x00, 0x62, 0x00, 0x63, 0x00, 0x64, 0x00]));

  qrData.title = 'z';
  expect(qrData.getBytes().subarray(0, 8))
    .toStrictEqual(new Uint8Array([0x7A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]));
});

for (const sample of sampleDesigns) {
  test(`it can set property values: ${sample.description}`, () => {
    const qrData = new QRData(sample.type, sample.index);

    if (sample.type === DesignType.Normal || sample.index === 0) {
      qrData.title = sample.properties.title;
      qrData.playerId = sample.properties.playerId;
      qrData.creator = sample.properties.creator;
      qrData.sex = sample.properties.sex;
      qrData.villageId = sample.properties.villageId;
      qrData.village = sample.properties.village;
      qrData.language = sample.properties.language;
      qrData.country = sample.properties.country;
      qrData.region = sample.properties.region;
      qrData.paletteColors = sample.properties.paletteColors;
      qrData.color = sample.properties.color;
      qrData.looks = sample.properties.looks;
      qrData.usage = sample.properties.usage;

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
    }

    qrData.colorData = sample.properties.colorData;
    expect(qrData.colorData).toStrictEqual(sample.properties.colorData);

    expect(qrData.getBytes()).toStrictEqual(sample.bytes);
  });
}

test('palette colors must be the right length', () => {
  const qrData = new QRData(DesignType.Normal);

  expect(() => qrData.paletteColors = new Uint8Array(15)).not.toThrow();
  expect(() => qrData.paletteColors = new Uint8Array(1)).toThrow();
});

test('color data must be the right length', () => {
  let qrData = new QRData(DesignType.Normal);
  expect(() => qrData.colorData = new Uint8Array(512)).not.toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  qrData = new QRData(DesignType.Pro, 0);
  expect(() => qrData.colorData = new Uint8Array(432)).not.toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  qrData = new QRData(DesignType.Pro, 1);
  expect(() => qrData.colorData = new Uint8Array(540)).not.toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  qrData = new QRData(DesignType.Pro, 2);
  expect(() => qrData.colorData = new Uint8Array(540)).not.toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  qrData = new QRData(DesignType.Pro, 3);
  expect(() => qrData.colorData = new Uint8Array(536)).not.toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();
});

test('it doesn\'t allow writing to invalid properties on normal QR codes', () => {
  const qrData = new QRData(DesignType.Normal);

  expect(() => qrData.paletteColors = new Uint8Array(1)).toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  expect(() => qrData.title = undefined).toThrow();
  expect(() => qrData.playerId = undefined).toThrow();
  expect(() => qrData.creator = undefined).toThrow();
  expect(() => qrData.sex = undefined).toThrow();
  expect(() => qrData.villageId = undefined).toThrow();
  expect(() => qrData.village = undefined).toThrow();
  expect(() => qrData.language = undefined).toThrow();
  expect(() => qrData.country = undefined).toThrow();
  expect(() => qrData.region = undefined).toThrow();
  expect(() => qrData.paletteColors = undefined).toThrow();
  expect(() => qrData.color = undefined).toThrow();
  expect(() => qrData.looks = undefined).toThrow();
  expect(() => qrData.usage = undefined).toThrow();
});

test('it doesn\'t allow writing to invalid properties on the first pro QR code', () => {
  const qrData = new QRData(DesignType.Pro, 0);

  expect(() => qrData.paletteColors = new Uint8Array(1)).toThrow();
  expect(() => qrData.colorData = new Uint8Array(1)).toThrow();

  expect(() => qrData.title = undefined).toThrow();
  expect(() => qrData.playerId = undefined).toThrow();
  expect(() => qrData.creator = undefined).toThrow();
  expect(() => qrData.sex = undefined).toThrow();
  expect(() => qrData.villageId = undefined).toThrow();
  expect(() => qrData.village = undefined).toThrow();
  expect(() => qrData.language = undefined).toThrow();
  expect(() => qrData.country = undefined).toThrow();
  expect(() => qrData.region = undefined).toThrow();
  expect(() => qrData.paletteColors = undefined).toThrow();
  expect(() => qrData.color = undefined).toThrow();
  expect(() => qrData.looks = undefined).toThrow();
  expect(() => qrData.usage = undefined).toThrow();
});

test('it doesn\'t allow writing to invalid properties on subsequent pro QR codes', () => {
  const qrData = new QRData(DesignType.Pro, 1);

  expect(() => qrData.title = 'test').toThrow();
  expect(() => qrData.playerId = 0).toThrow();
  expect(() => qrData.creator = 'test').toThrow();
  expect(() => qrData.sex = 0).toThrow();
  expect(() => qrData.villageId = 0).toThrow();
  expect(() => qrData.village = 'test').toThrow();
  expect(() => qrData.language = 0).toThrow();
  expect(() => qrData.country = 0).toThrow();
  expect(() => qrData.region = 0).toThrow();
  expect(() => qrData.paletteColors = new Uint8Array(15)).toThrow();
  expect(() => qrData.color = 0).toThrow();
  expect(() => qrData.looks = 0).toThrow();
  expect(() => qrData.usage = 0).toThrow();

  expect(() => qrData.title = undefined).toThrow();
  expect(() => qrData.playerId = undefined).toThrow();
  expect(() => qrData.creator = undefined).toThrow();
  expect(() => qrData.sex = undefined).toThrow();
  expect(() => qrData.villageId = undefined).toThrow();
  expect(() => qrData.village = undefined).toThrow();
  expect(() => qrData.language = undefined).toThrow();
  expect(() => qrData.country = undefined).toThrow();
  expect(() => qrData.region = undefined).toThrow();
  expect(() => qrData.paletteColors = undefined).toThrow();
  expect(() => qrData.color = undefined).toThrow();
  expect(() => qrData.looks = undefined).toThrow();
  expect(() => qrData.usage = undefined).toThrow();
});
