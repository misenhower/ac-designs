import { DesignType } from '../../src';

interface QRCodeData {
  bytes: Uint8Array;
  outputPngFile: string;
  outputDataUrlFile: string;
}

export const proDesign = {
  description: 'Pro design',
  bytes: new Uint8Array([0x4d, 0x00, 0x6f, 0x00, 0x72, 0x00, 0x69, 0x00, 0x20, 0x00, 0x41, 0x00, 0x75, 0x00, 0x74, 0x00, 0x75, 0x00, 0x6d, 0x00, 0x6e, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe0, 0xc0, 0x4d, 0x00, 0x65, 0x00, 0x6c, 0x00, 0x6f, 0x00, 0x64, 0x00, 0x79, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x27, 0x8e, 0x4d, 0x00, 0x61, 0x00, 0x6c, 0x00, 0x6f, 0x00, 0x6d, 0x00, 0x6f, 0x00, 0x72, 0x00, 0x69, 0x00, 0x00, 0x00, 0x01, 0x00, 0x31, 0x0c, 0x34, 0x13, 0x16, 0x30, 0x35, 0x67, 0x61, 0x60, 0xd7, 0x41, 0x11, 0x63, 0x0f, 0xd5, 0x38, 0xe9, 0x00, 0x00, 0x00, 0x00, 0x37, 0x66, 0x37, 0x37, 0x73, 0x76, 0x77, 0x37, 0xc3, 0x33, 0x77, 0xc3, 0x73, 0x36, 0x36, 0xb3, 0x7b, 0x33, 0x66, 0x73, 0x33, 0x67, 0x77, 0x77, 0x77, 0x77, 0xc3, 0x33, 0x67, 0x73, 0x33, 0xb3, 0xb7, 0x37, 0x33, 0x36, 0x37, 0x73, 0x36, 0x3c, 0x3c, 0x3c, 0x73, 0x67, 0x36, 0x77, 0x33, 0x33, 0x3b, 0x77, 0x33, 0x63, 0x73, 0x33, 0x67, 0x77, 0x33, 0x73, 0x77, 0x66, 0x73, 0x37, 0x63, 0x63, 0xbb, 0x73, 0x37, 0x73, 0x36, 0x37, 0x3c, 0x77, 0x77, 0x77, 0x66, 0x36, 0x77, 0xc3, 0x36, 0xb6, 0xb4, 0xeb, 0x77, 0x33, 0x67, 0x33, 0xc3, 0xc3, 0x73, 0x67, 0x36, 0x73, 0xc7, 0xb3, 0x66, 0xbb, 0x4b, 0x7b, 0x7e, 0x37, 0x73, 0x76, 0x37, 0x3c, 0x33, 0x33, 0x73, 0x77, 0x33, 0x66, 0xbe, 0x4b, 0xb4, 0xb4, 0xe7, 0x77, 0x77, 0x67, 0x76, 0x77, 0x67, 0x76, 0x77, 0x77, 0xb7, 0xb6, 0xbe, 0xb4, 0x4b, 0xbb, 0x7e, 0x7e, 0x77, 0x77, 0x67, 0x66, 0x76, 0x67, 0x6b, 0x6b, 0x6b, 0xbb, 0xbe, 0x4b, 0xb4, 0xb4, 0xee, 0xe6, 0x77, 0x77, 0x77, 0x77, 0x77, 0xb6, 0x66, 0x37, 0x77, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xb6, 0xb6, 0xb6, 0xb6, 0xb6, 0x77, 0xc3, 0x73, 0x77, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0xee, 0x7e, 0x77, 0x77, 0xc3, 0x33, 0x77, 0xe7, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0x22, 0xe2, 0x7e, 0x7e, 0x7e, 0x7e, 0x7e, 0xee, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0x11, 0x1a, 0xe2, 0xe2, 0x27, 0x27, 0xe7, 0x4c, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0xa2, 0x21, 0x11, 0x22, 0x22, 0x22, 0xe2, 0xbe, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0x21, 0x12, 0x2a, 0x2a, 0x1a, 0x22, 0xe1, 0x4c, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0x12, 0x21, 0x21, 0x21, 0x21, 0x11, 0xe2, 0xbe, 0xeb, 0x4b, 0x4b, 0xb4, 0xb4, 0xeb, 0xb4, 0xec, 0x11, 0x11, 0x1a, 0x12, 0x1a, 0x11, 0xe1, 0x4c, 0xeb, 0xb4, 0xb4, 0x4b, 0x4b, 0xeb, 0x4b, 0xee, 0x12, 0x2a, 0x21, 0x2a, 0x21, 0xa1, 0xe2, 0xbe, 0xbe, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xbe, 0xec, 0xa1, 0x11, 0x2a, 0x21, 0x1a, 0x1a, 0xe1, 0xec, 0xbb, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0xee, 0x12, 0x21, 0x11, 0x12, 0x21, 0x11, 0xe2, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xec, 0x21, 0x12, 0x2a, 0x2a, 0x1a, 0x22, 0xe1, 0xbc, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0x12, 0x2a, 0x21, 0x21, 0x21, 0xa1, 0xe2, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xec, 0xa1, 0x11, 0x1a, 0x12, 0x1a, 0x1a, 0xe1, 0xbc, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0xe2, 0x5e, 0xe5, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xbe, 0xec, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0xe2, 0x5c, 0xe5, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4e, 0xee, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0xe2, 0x4e, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xec, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0xe2, 0xbc, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4e, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x5b, 0xe5, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xbe, 0x8c, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0xe8, 0x54, 0xe5, 0xb4, 0xb4, 0x77, 0x37, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x37, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x3e, 0x7e, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0xee, 0xe4, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0x4b, 0x4b, 0x4e, 0x4e, 0xee, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xbb, 0x4e, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbe, 0xbb, 0xeb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbb, 0xbb, 0xbb, 0xeb, 0xbb, 0xbb, 0xeb, 0xbb, 0xbe, 0xbb, 0xbb, 0xeb, 0xbb, 0xbb, 0xbb, 0xbb, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x3e, 0x3e, 0xee, 0x73, 0xe3, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbe, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x54, 0xb5, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x5b, 0x45, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xbb, 0xbb, 0xeb, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x3e, 0x3e, 0xee, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x3e, 0x3e, 0xee, 0x73, 0xe3, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbe, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x54, 0xb5, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x5b, 0x45, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xbb, 0xbb, 0xeb, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x3e, 0x3e, 0xee, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0x8c, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xee, 0xee, 0xee, 0xee, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0xee, 0xee, 0xee, 0xee, 0x88, 0x88, 0x88, 0x88, 0x88, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xb7, 0xb8, 0xb7, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xbe, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xbe, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xee, 0xee, 0xee, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xbe, 0xb8, 0xee, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xeb, 0xe8, 0xbe, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xd8, 0xdd, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x77, 0x77, 0x76, 0x67, 0x77, 0x00, 0x00, 0x00, 0x00]),
  type: DesignType.Pro,
  parity: 0x61,
  properties: {
    title: 'Mori Autumn',
    playerId: 57536,
    creator: 'Melody',
    sex: 1,
    villageId: 10126,
    village: 'Malomori',
    languageId: 1,
    countryId: 49,
    regionId: 12,
    paletteColors: new Uint8Array([0x34, 0x13, 0x16, 0x30, 0x35, 0x67, 0x61, 0x60, 0xd7, 0x41, 0x11, 0x63, 0x0f, 0xd5, 0x38]),
    color: 233,
    looks: 0,
    usageId: 0,
    colorData: new Uint8Array([0x37, 0x66, 0x37, 0x37, 0x73, 0x76, 0x77, 0x37, 0xc3, 0x33, 0x77, 0xc3, 0x73, 0x36, 0x36, 0xb3, 0x7b, 0x33, 0x66, 0x73, 0x33, 0x67, 0x77, 0x77, 0x77, 0x77, 0xc3, 0x33, 0x67, 0x73, 0x33, 0xb3, 0xb7, 0x37, 0x33, 0x36, 0x37, 0x73, 0x36, 0x3c, 0x3c, 0x3c, 0x73, 0x67, 0x36, 0x77, 0x33, 0x33, 0x3b, 0x77, 0x33, 0x63, 0x73, 0x33, 0x67, 0x77, 0x33, 0x73, 0x77, 0x66, 0x73, 0x37, 0x63, 0x63, 0xbb, 0x73, 0x37, 0x73, 0x36, 0x37, 0x3c, 0x77, 0x77, 0x77, 0x66, 0x36, 0x77, 0xc3, 0x36, 0xb6, 0xb4, 0xeb, 0x77, 0x33, 0x67, 0x33, 0xc3, 0xc3, 0x73, 0x67, 0x36, 0x73, 0xc7, 0xb3, 0x66, 0xbb, 0x4b, 0x7b, 0x7e, 0x37, 0x73, 0x76, 0x37, 0x3c, 0x33, 0x33, 0x73, 0x77, 0x33, 0x66, 0xbe, 0x4b, 0xb4, 0xb4, 0xe7, 0x77, 0x77, 0x67, 0x76, 0x77, 0x67, 0x76, 0x77, 0x77, 0xb7, 0xb6, 0xbe, 0xb4, 0x4b, 0xbb, 0x7e, 0x7e, 0x77, 0x77, 0x67, 0x66, 0x76, 0x67, 0x6b, 0x6b, 0x6b, 0xbb, 0xbe, 0x4b, 0xb4, 0xb4, 0xee, 0xe6, 0x77, 0x77, 0x77, 0x77, 0x77, 0xb6, 0x66, 0x37, 0x77, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xb6, 0xb6, 0xb6, 0xb6, 0xb6, 0x77, 0xc3, 0x73, 0x77, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0xee, 0x7e, 0x77, 0x77, 0xc3, 0x33, 0x77, 0xe7, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0x22, 0xe2, 0x7e, 0x7e, 0x7e, 0x7e, 0x7e, 0xee, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0x11, 0x1a, 0xe2, 0xe2, 0x27, 0x27, 0xe7, 0x4c, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0xa2, 0x21, 0x11, 0x22, 0x22, 0x22, 0xe2, 0xbe, 0xb4, 0xbe, 0x4b, 0xb4, 0xb4, 0xbe, 0xb4, 0xec, 0x21, 0x12, 0x2a, 0x2a, 0x1a, 0x22, 0xe1, 0x4c, 0xbb, 0xbe, 0xb4, 0x4b, 0xbb, 0x4e, 0x4b, 0xee, 0x12, 0x21, 0x21, 0x21, 0x21, 0x11, 0xe2, 0xbe, 0xeb, 0x4b, 0x4b, 0xb4, 0xb4, 0xeb, 0xb4, 0xec, 0x11, 0x11, 0x1a, 0x12, 0x1a, 0x11, 0xe1, 0x4c, 0xeb, 0xb4, 0xb4, 0x4b, 0x4b, 0xeb, 0x4b, 0xee, 0x12, 0x2a, 0x21, 0x2a, 0x21, 0xa1, 0xe2, 0xbe, 0xbe, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xbe, 0xec, 0xa1, 0x11, 0x2a, 0x21, 0x1a, 0x1a, 0xe1, 0xec, 0xbb, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0xee, 0x12, 0x21, 0x11, 0x12, 0x21, 0x11, 0xe2, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xec, 0x21, 0x12, 0x2a, 0x2a, 0x1a, 0x22, 0xe1, 0xbc, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0x12, 0x2a, 0x21, 0x21, 0x21, 0xa1, 0xe2, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xec, 0xa1, 0x11, 0x1a, 0x12, 0x1a, 0x1a, 0xe1, 0xbc, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0xe2, 0x5e, 0xe5, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xbe, 0xec, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0xe2, 0x5c, 0xe5, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4e, 0xee, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0xe2, 0x4e, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xec, 0x22, 0x22, 0x22, 0x22, 0x22, 0x22, 0xe2, 0xbc, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4e, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x5b, 0xe5, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xbe, 0x8c, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0xe8, 0x54, 0xe5, 0xb4, 0xb4, 0x77, 0x37, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x37, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x33, 0x3e, 0x7e, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0x77, 0xee, 0xe4, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0xe3, 0x4b, 0x4b, 0x4e, 0x4e, 0xee, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0x4e, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xbb, 0x4e, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xbb, 0xb4, 0xb4, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbe, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbe, 0xb4, 0xeb, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbe, 0xbb, 0xeb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbb, 0xbb, 0xbb, 0xeb, 0xbb, 0xbb, 0xeb, 0xbb, 0xbe, 0xbb, 0xbb, 0xeb, 0xbb, 0xbb, 0xbb, 0xbb, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4e, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xbe, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x3e, 0x3e, 0xee, 0x73, 0xe3, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbe, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x54, 0xb5, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x5b, 0x45, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xbb, 0xbb, 0xeb, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x3e, 0x3e, 0xee, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x3e, 0x3e, 0xee, 0x73, 0xe3, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xbe, 0x7e, 0x4b, 0x4b, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0x54, 0xb5, 0xe4, 0x73, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x5b, 0x45, 0xeb, 0x73, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xbb, 0xbb, 0xeb, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x3e, 0x3e, 0xee, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0x77, 0xe3, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0x4b, 0xbb, 0x7e, 0x4b, 0x4b, 0xeb, 0x77, 0xbe, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xb4, 0xe4, 0xe3, 0xb4, 0xb4, 0xe4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0x8c, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xe4, 0x4b, 0x4b, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0xeb, 0xb4, 0xb4, 0xbc, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0xe8, 0xb4, 0xe4, 0xb4, 0xb4, 0xee, 0xee, 0xee, 0xee, 0xee, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xc8, 0xee, 0xee, 0xee, 0xee, 0x88, 0x88, 0x88, 0x88, 0x88, 0xdd, 0xd8, 0xdd, 0xd8, 0xdd, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xb7, 0xb8, 0xb7, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0x3b, 0x3d, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xbe, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xbe, 0xb4, 0xe4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4e, 0x4b, 0xeb, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xb4, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xee, 0xee, 0xee, 0xb4, 0xb4, 0xe4, 0xb4, 0xb4, 0xb4, 0xb4, 0x4b, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0xbe, 0xb8, 0xee, 0x4b, 0x4b, 0xeb, 0x4b, 0x4b, 0x4b, 0x4b, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xeb, 0xe8, 0xbe, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xd8, 0xdd, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0x88, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0xb3, 0xb8, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0x3b, 0x38, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0xbb, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x76, 0x63, 0x37, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x36, 0x67, 0x73, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x36, 0x63, 0x33, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x67, 0x77, 0x76, 0x77, 0x77, 0x76, 0x67, 0x77]),
  },
  qrCodeDatas: [] as QRCodeData[],
  imagePngFile: 'pro_image.png',
  imageBase64: 'data:image/png;base64,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',
};

// Split the data into 4 QR codes
proDesign.qrCodeDatas.push({
  bytes: proDesign.bytes.subarray(0, 540),
  outputPngFile: 'output_pro_1.png',
  outputDataUrlFile: 'output_pro_1.txt',
});
proDesign.qrCodeDatas.push({
  bytes: proDesign.bytes.subarray(540, 1080),
  outputPngFile: 'output_pro_2.png',
  outputDataUrlFile: 'output_pro_2.txt',
});
proDesign.qrCodeDatas.push({
  bytes: proDesign.bytes.subarray(1080, 1620),
  outputPngFile: 'output_pro_3.png',
  outputDataUrlFile: 'output_pro_3.txt',
});
proDesign.qrCodeDatas.push({
  bytes: proDesign.bytes.subarray(1620, 2160),
  outputPngFile: 'output_pro_4.png',
  outputDataUrlFile: 'output_pro_4.txt',
});
