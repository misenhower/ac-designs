import { promises as fs } from 'fs';
import { withFile } from 'tmp-promise';
import { QRData, DesignType } from '../src';
import { normalDesign } from './fixtures/normalDesign';
import { proDesign } from './fixtures/proDesign';


[normalDesign, proDesign].forEach((design) => {
  design.qrCodeDatas.forEach((qrCodeData, i) => {
    test(`it can generate a QR code image: ${design.description}, index: ${i}`, async () => {
      const index = (design.qrCodeDatas.length > 1) ? i : undefined;
      const qrData = new QRData(qrCodeData.bytes, index, design.parity);

      const expected = await fs.readFile(`tests/fixtures/${qrCodeData.outputPngFile}`);

      await withFile(async ({ path }) => {
        await qrData.toImage().toFile(path);
        const actual = await fs.readFile(path);
        expect(actual).toStrictEqual(expected);
      });
    });
  });
});
