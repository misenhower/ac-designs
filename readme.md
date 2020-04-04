# ac-designs

This package makes it easy to generate (or parse) QR codes for Animal Crossing designs.

This isn't quite ready for use yet, so check back soon!

## Roadmap

- [X] `QRData` Class
  - [X] Read QR properties from byte data
  - [X] Write QR properties to byte data
  - [ ] Generate QR code images

- [ ] `Design` Class
  - [ ] Read design data from one or more `QRData` instances
  - [ ] Write new design data back out to `QRData` instances
  - [ ] Convert AC design format to normal images
  - [ ] Use xBRZ to smooth upscaled images
  - [ ] Convert normal images to AC designs, scaling and converting colors where necessary
