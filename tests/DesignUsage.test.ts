import { DesignUsage, DesignType, ImageSize } from '../src';

test('normal design parameters', () => {
  const usage = new DesignUsage({
    id: 0xAB,
    description: 'Test',
    type: DesignType.Normal,
    imageSize: ImageSize.Normal,
  });

  expect(usage.width).toBe(32);
  expect(usage.height).toBe(32);
  expect(usage.pixelCount).toBe(1024);
  expect(usage.imageDataByteLength).toBe(512);
  expect(usage.byteLength).toBe(620);
  expect(usage.qrCodeCount).toBe(1);
});

test('small pro design parameters', () => {
  const usage = new DesignUsage({
    id: 0xAB,
    description: 'Test',
    type: DesignType.Pro,
    imageSize: ImageSize.Normal,
  });

  expect(usage.width).toBe(32);
  expect(usage.height).toBe(32);
  expect(usage.pixelCount).toBe(1024);
  expect(usage.imageDataByteLength).toBe(512);
  expect(usage.byteLength).toBe(620);
  expect(usage.qrCodeCount).toBe(1);
});

test('large pro design parameters', () => {
  const usage = new DesignUsage({
    id: 0xAB,
    description: 'Test',
    type: DesignType.Pro,
    imageSize: ImageSize.Large,
  });

  expect(usage.width).toBe(32);
  expect(usage.height).toBe(128);
  expect(usage.pixelCount).toBe(4096);
  expect(usage.imageDataByteLength).toBe(2048);
  expect(usage.byteLength).toBe(2160);
  expect(usage.qrCodeCount).toBe(4);
});
