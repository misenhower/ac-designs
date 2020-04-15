export function getByteSubset(data: Uint8Array, offset: number, length: number): Uint8Array {
  return data.subarray(offset, offset + length);
}

export function getString(data: Uint8Array, offset: number, length: number): string {
  const bytes = getByteSubset(data, offset, length);
  const result = new TextDecoder('utf-16le', { ignoreBOM: true }).decode(bytes);
  return result.includes('\u0000') ? result.split('\u0000', 1)[0] : result;
}

export function getNumber(data: Uint8Array, offset: number, length: number): number {
  return getByteSubset(data, offset, length)
    .reduce((result, b) => (result << 8) + b, 0);
}

export function setByteSubset(data: Uint8Array, offset: number, bytes: Uint8Array): void {
  data.set(bytes, offset);
}

export function setString(data: Uint8Array, offset: number, length: number, value: string): void {
  // Convert the string to UTF-16 LE
  // NOTE: This may not truncate multi-code unit characters properly. Code points
  // that require more than 2 bytes may be malformed.
  const bytes = new Uint8Array(length);
  for (let i = 0; i < value.length && i * 2 < bytes.length; i++) {
    const charCode = value.charCodeAt(i);
    bytes[i * 2] = charCode;
    bytes[i * 2 + 1] = charCode >> 8;
  }

  setByteSubset(data, offset, bytes);
}

export function setNumber(data: Uint8Array, offset: number, length: number, value: number): void {
  for (let i = 0; i < length; i++) {
    data[offset + i] = value >> (8 * (length - i - 1));
  }
}

export function calculateParity(data: Uint8Array, previousValue = 0): number {
  return data.reduce((parity, byte) => parity ^ byte, previousValue);
}

/** Compresses separate nibbles into bytes, e.g., 0x0A0B0C0D becomes 0xBADC */
export function compressColorData(data: Uint8Array): Uint8Array {
  const result = new Uint8Array(data.length / 2);
  for (let i = 0; i < result.length; i++) {
    result[i] = (data[i * 2] & 0x0F) + (data[i * 2 + 1] << 4);
  }
  return result;
}

/** Extracts separate nibbles from bytes, e.g., 0xBADC becomes 0x0A0B0C0D */
export function extractColorData(data: Uint8Array): Uint8Array {
  const result = new Uint8Array(data.length * 2);
  for (let i = 0; i < data.length; i++) {
    result[i * 2] = (data[i] & 0x0F);
    result[i * 2 + 1] = (data[i] >>> 4);
  }
  return result;
}
