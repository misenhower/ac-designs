import { Design, DesignType, DesignUsage, QRData } from '../src';
import { normalDesign } from './fixtures/normalDesign';
import { proDesign } from './fixtures/proDesign';

const FakeNormalDesignUsage = new DesignUsage(0xAB, DesignType.Normal, 'Fake Normal');
const FakeProDesignUsage = new DesignUsage(0xCD, DesignType.Pro, 'Fake Pro');

function designFactory(usage: DesignUsage = DesignUsage.CustomDesign): Design {
  const design = new Design(usage);
  design.title = 'Fake title';
  design.creator = 'Fake creator';
  design.village = 'Fake village';
  return design;
}

test('title is required', () => {
  const design = designFactory();

  design.title = undefined;
  expect(() => design.getBytes()).toThrow();
});

test('creator is required', () => {
  const design = designFactory();

  design.creator = undefined;
  expect(() => design.getBytes()).toThrow();
});

test('village is required', () => {
  const design = designFactory();

  design.village = undefined;
  expect(() => design.getBytes()).toThrow();
});

test('normal designs use the correct number of bytes', () => {
  const design = designFactory(FakeNormalDesignUsage);
  expect(design.getBytes().length).toBe(620);
  expect(design.colorData.length).toBe(512);
});

test('pro designs use the correct number of bytes', () => {
  const design = designFactory(FakeProDesignUsage);
  expect(design.getBytes().length).toBe(2160);
  expect(design.colorData.length).toBe(2048);
});

test('update design usage by value', () => {
  const design = new Design();
  const usage = DesignUsage.SleevelessDress;

  design.usage = usage;

  expect(design.usage).toBe(usage);
  expect(design.usageId).toBe(usage.id);
});

test('update design usage by ID', () => {
  const design = new Design();
  const usage = DesignUsage.SleevelessDress;

  design.usageId = usage.id;

  expect(design.usage).toBe(usage);
  expect(design.usageId).toBe(usage.id);
});

test('must specify a valid design usage ID', () => {
  const design = new Design();

  expect(() => design.usageId = -1).toThrow();
});

test('normal color data must be the right length', () => {
  const design = new Design(FakeNormalDesignUsage);
  expect(() => design.colorData = new Uint8Array(512)).not.toThrow();
  expect(() => design.colorData = new Uint8Array(1)).toThrow();
});

test('pro color data must be the right length', () => {
  const design = new Design(FakeProDesignUsage);
  expect(() => design.colorData = new Uint8Array(2048)).not.toThrow();
  expect(() => design.colorData = new Uint8Array(1)).toThrow();
});

[normalDesign, proDesign].forEach((sample) => {
  test(`it can read property values: ${sample.description}`, () => {
    const design = Design.fromBytes(sample.bytes);

    expect(design.usage.type).toBe(sample.type);

    expect(design.title).toBe(sample.properties.title);
    expect(design.playerId).toBe(sample.properties.playerId);
    expect(design.creator).toBe(sample.properties.creator);
    expect(design.sex).toBe(sample.properties.sex);
    expect(design.villageId).toBe(sample.properties.villageId);
    expect(design.village).toBe(sample.properties.village);
    expect(design.languageId).toBe(sample.properties.languageId);
    expect(design.countryId).toBe(sample.properties.countryId);
    expect(design.regionId).toBe(sample.properties.regionId);
    expect(design.colorPalette.acnlBytes).toStrictEqual(sample.properties.paletteColors);
    expect(design.color).toBe(sample.properties.color);
    expect(design.looks).toBe(sample.properties.looks);
    expect(design.usageId).toBe(sample.properties.usageId);
    expect(design.colorData).toStrictEqual(sample.properties.colorData);

    expect(design.getBytes()).toStrictEqual(sample.bytes);
  });
});

test('it can read single QR data values', () => {
  const qrData = QRData.fromBytes(normalDesign.qrCodeDatas[0].bytes);
  const design = Design.fromQRData(qrData);

  expect(design.title).toBe(normalDesign.properties.title);
  expect(design.getBytes()).toStrictEqual(normalDesign.bytes);
});

test('it can read multiple QR data values', () => {
  const qrDatas = proDesign.qrCodeDatas.map((d, i) => QRData.fromBytes(d.bytes, i));
  const design = Design.fromQRData(qrDatas);

  expect(design.title).toBe(proDesign.properties.title);
  expect(design.getBytes()).toStrictEqual(proDesign.bytes);
});

test('it handles special characters', () => {
  const design = designFactory();

  design.title = 'あ';
  expect(design.title).toBe('あ');
  expect(design.getBytes().subarray(0, 2)).toStrictEqual(new Uint8Array([0x42, 0x30]));

  design.title = '👍';
  expect(design.title).toBe('👍');
  expect(design.getBytes().subarray(0, 4)).toStrictEqual(new Uint8Array([0x3D, 0xD8, 0x4D, 0xDC]));
});

[normalDesign, proDesign].forEach((sample) => {
  test(`it can set property values: ${sample.description}`, () => {
    const design = new Design;

    design.title = sample.properties.title;
    design.playerId = sample.properties.playerId;
    design.creator = sample.properties.creator;
    design.sex = sample.properties.sex;
    design.villageId = sample.properties.villageId;
    design.village = sample.properties.village;
    design.languageId = sample.properties.languageId;
    design.countryId = sample.properties.countryId;
    design.regionId = sample.properties.regionId;
    design.colorPalette.acnlBytes = sample.properties.paletteColors;
    design.color = sample.properties.color;
    design.looks = sample.properties.looks;
    design.usageId = sample.properties.usageId;
    design.colorData = sample.properties.colorData;

    expect(design.getBytes()).toStrictEqual(sample.bytes);
  });
});

test('it generates normal QR codes', () => {
  const design = Design.fromBytes(normalDesign.bytes);

  const qrDatas = design.getQRData();

  expect(qrDatas).toHaveLength(1);
  expect(qrDatas[0].bytes).toStrictEqual(normalDesign.qrCodeDatas[0].bytes);
  expect(qrDatas[0].index).toBeUndefined();
  expect(qrDatas[0].parity).toBeUndefined();
});

test('it generates pro QR codes', () => {
  const design = Design.fromBytes(proDesign.bytes);

  const qrDatas = design.getQRData();

  expect(qrDatas).toHaveLength(4);

  for (let i = 0; i < 4; i++) {
    expect(qrDatas[i].bytes).toStrictEqual(proDesign.qrCodeDatas[i].bytes);
    expect(qrDatas[i].index).toBe(i);
    expect(qrDatas[i].parity).toBe(proDesign.parity);
  }
});
