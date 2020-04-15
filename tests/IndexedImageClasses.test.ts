import { Design, IndexedImage, IndexedImageSegment, CompositeIndexedImage } from '../src';

// Sample image data for testing
// Note: Valid color index values actually fall in the range of 0-15,
// but using this range of values makes it easier for testing.

// W: 8, H: 8
const imageData = new Uint8Array([
  /*         0     1     2     3     4     5     6     7 */
  /* 0 */ 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
  /* 1 */ 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F,
  /* 2 */ 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
  /* 3 */ 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
  /* 4 */ 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27,
  /* 5 */ 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F,
  /* 6 */ 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
  /* 7 */ 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F,
]);

// A few subsegments of the above image
// X: 0, Y: 0, W: 3, H: 4
const imageSegmentA = new Uint8Array([
  /*         0     1     2 */
  /* 0 */ 0x00, 0x01, 0x02,
  /* 1 */ 0x08, 0x09, 0x0A,
  /* 2 */ 0x10, 0x11, 0x12,
  /* 3 */ 0x18, 0x19, 0x1A,
]);

// X: 3, Y: 2, W: 4, H: 3
const imageSegmentB = new Uint8Array([
  /*         0     1     2     3 */
  /* 0 */ 0x13, 0x14, 0x15, 0x16,
  /* 1 */ 0x1B, 0x1C, 0x1D, 0x1E,
  /* 2 */ 0x23, 0x24, 0x25, 0x26,
]);

// W: 8, H: 8, composited from the other segments (transparent pixels are 0x0F)
const ____ = 0x0F;
const compositedImage = new Uint8Array([
  /*         0     1     2     3     4     5     6     7 */
  /* 0 */ ____, ____, ____, ____, ____, ____, ____, ____,
  /* 1 */ ____, 0x00, 0x01, 0x02, ____, ____, ____, ____,
  /* 2 */ ____, 0x08, 0x09, 0x0A, ____, ____, ____, ____,
  /* 3 */ ____, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16,
  /* 4 */ ____, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E,
  /* 5 */ ____, ____, ____, ____, 0x23, 0x24, 0x25, 0x26,
  /* 6 */ ____, ____, ____, ____, ____, ____, ____, ____,
  /* 7 */ ____, ____, ____, ____, ____, ____, ____, ____,
]);

test('IndexedImage creates its own empty pixel array', () => {
  const image = new IndexedImage(8, 4);

  expect(image.width).toBe(8);
  expect(image.height).toBe(4);
  expect(image.colorIndexes).toStrictEqual(new Uint8Array(8 * 4));
});

test('IndexedImage can load and export image data', () => {
  const image = new IndexedImage(8, 8);

  image.colorIndexes = imageData;

  expect(image.colorIndexes).toStrictEqual(imageData);
  expect(image.getColorIndexAt(2, 4)).toBe(0x22);
});

test('IndexedImage retrieves its color palette from the associated design', () => {
  const design = new Design;
  const image = new IndexedImage(8, 8, design);

  expect(image.colorPalette).toBe(design.colorPalette);

  image.design = undefined;
  expect(() => image.colorPalette).toThrow();
});

test('IndexedImageSegment retrieves the specified segment', () => {
  const image = new IndexedImage(8, 8);
  image.colorIndexes = imageData;

  let segment = new IndexedImageSegment(image, 0, 0, 3, 4);
  expect(segment.colorIndexes).toStrictEqual(imageSegmentA);
  expect(segment.getColorIndexAt(1, 2)).toBe(0x11);

  segment = new IndexedImageSegment(image, 3, 2, 4, 3);
  expect(segment.colorIndexes).toStrictEqual(imageSegmentB);
  expect(segment.getColorIndexAt(1, 2)).toBe(0x24);
});

test('IndexedImageSegment can update individual pixels', () => {
  const image = new IndexedImage(8, 8);
  const segment = new IndexedImageSegment(image, 1, 2, 3, 4);

  // 1, 2 in the segment translates to 2, 4 in the parent image
  segment.setColorIndexAt(1, 2, 0xFF);

  expect(segment.getColorIndexAt(1, 2)).toBe(0xFF);
  expect(image.getColorIndexAt(2, 4)).toBe(0xFF);
  expect(image.getColorIndexAt(1, 2)).toBe(0x00); // sanity check
});

test('IndexedImageSegment can update its range of pixels', () => {
  const expected = new Uint8Array([
    0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00,
    0x00, 0xFF, 0xFF, 0xFF, 0x00,
    0x00, 0xFF, 0xFF, 0xFF, 0x00,
    0x00, 0xFF, 0xFF, 0xFF, 0x00,
    0x00, 0xFF, 0xFF, 0xFF, 0x00,
    0x00, 0x00, 0x00, 0x00, 0x00,
  ]);
  const image = new IndexedImage(5, 7);
  const segment = new IndexedImageSegment(image, 1, 2, 3, 4);

  const replacement = new Uint8Array(3 * 4);
  replacement.fill(0xFF);

  segment.colorIndexes = replacement;

  expect(image.colorIndexes).toStrictEqual(expected);
});

test('CompositeIndexedImage can retrieve pixels from multiple sources', () => {
  const image = new IndexedImage(8, 8);
  image.colorIndexes = imageData;

  const composite = (new CompositeIndexedImage(8, 8))
    .addSource(image.getSegment(0, 0, 3, 4), 1, 1)
    .addSource(image.getSegment(3, 2, 4, 3), 4, 3);

  expect(composite.colorIndexes).toStrictEqual(compositedImage);
});

test('CompositeIndexedImage can set individual pixels', () => {
  const image = new IndexedImage(8, 8);

  const composite = (new CompositeIndexedImage(8, 8))
    .addSource(image.getSegment(0, 0, 3, 4), 1, 1)
    .addSource(image.getSegment(3, 2, 4, 3), 4, 3);

  // This should have no effect, but it shouldn't return an error either
  composite.setColorIndexAt(0, 0, 0xAA);
  // 1, 1 in the composite image translates to 0, 0 in the parent image
  composite.setColorIndexAt(1, 1, 0xBB);
  // 6, 4 in the composite image translates to 5, 3 in the parent image
  composite.setColorIndexAt(6, 4, 0xCC);

  expect(composite.getColorIndexAt(0, 0)).toBe(0x0F);
  expect(composite.getColorIndexAt(1, 1)).toBe(0xBB);
  expect(composite.getColorIndexAt(6, 4)).toBe(0xCC);

  expect(image.getColorIndexAt(0, 0)).toBe(0xBB);
  expect(image.getColorIndexAt(5, 3)).toBe(0xCC);
});

test('replacement colorIndexes array must be the correct size', () => {
  const image = new IndexedImage(8, 8);
  const segment = image.getSegment(0, 0, 8, 8);
  const composite = (new CompositeIndexedImage(8, 8)).addSource(segment, 0, 0);

  expect(() => image.colorIndexes = new Uint8Array(1)).toThrow();
  expect(() => segment.colorIndexes = new Uint8Array(1)).toThrow();
  expect(() => composite.colorIndexes = new Uint8Array(1)).toThrow();
});

test('getColorIndexAt must be within bounds', () => {
  const image = new IndexedImage(8, 8);
  const segment = image.getSegment(0, 0, 8, 8);
  const composite = (new CompositeIndexedImage(8, 8)).addSource(segment, 0, 0);

  expect(() => image.getColorIndexAt(8, 0)).toThrow();
  expect(() => segment.getColorIndexAt(8, 0)).toThrow();
  expect(() => composite.getColorIndexAt(8, 0)).toThrow();

  expect(() => image.getColorIndexAt(0, 8)).toThrow();
  expect(() => segment.getColorIndexAt(0, 8)).toThrow();
  expect(() => composite.getColorIndexAt(0, 8)).toThrow();
});

test('setColorIndexAt must be within bounds', () => {
  const image = new IndexedImage(8, 8);
  const segment = image.getSegment(0, 0, 8, 8);
  const composite = (new CompositeIndexedImage(8, 8)).addSource(segment, 0, 0);

  expect(() => image.setColorIndexAt(8, 0, 0)).toThrow();
  expect(() => segment.setColorIndexAt(8, 0, 0)).toThrow();
  expect(() => composite.setColorIndexAt(8, 0, 0)).toThrow();

  expect(() => image.setColorIndexAt(0, 8, 0)).toThrow();
  expect(() => segment.setColorIndexAt(0, 8, 0)).toThrow();
  expect(() => composite.setColorIndexAt(0, 8, 0)).toThrow();
});

test('image segments must be within bounds', () => {
  const image = new IndexedImage(8, 8);

  // Sanity check
  expect(() => new IndexedImageSegment(image, 0, 0, 8, 8)).not.toThrow();

  // X and Y must be positive
  expect(() => new IndexedImageSegment(image, -1, 0, 8, 8)).toThrow();
  expect(() => new IndexedImageSegment(image, 0, -1, 8, 8)).toThrow();

  // X and Y must be within bounds
  expect(() => new IndexedImageSegment(image, 8, 0, 1, 1)).toThrow();
  expect(() => new IndexedImageSegment(image, 0, 8, 1, 1)).toThrow();

  // Width and height must be positive
  expect(() => new IndexedImageSegment(image, 0, 0, -1, 0)).toThrow();
  expect(() => new IndexedImageSegment(image, 0, 0, 0, -1)).toThrow();

  // Width and height must be within bounds
  expect(() => new IndexedImageSegment(image, 2, 2, 6, 6)).not.toThrow();
  expect(() => new IndexedImageSegment(image, 2, 2, 7, 6)).toThrow();
  expect(() => new IndexedImageSegment(image, 2, 2, 6, 7)).toThrow();
});
