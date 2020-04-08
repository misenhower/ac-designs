# ac-designs

This package makes it easy to generate and parse QR codes for Animal Crossing designs.

Many thanks to [ACNLPatternTool](https://github.com/Thulinma/ACNLPatternTool), which served as inspiration and reference for much of the design processing and data formatting code in this library.

**This isn't quite ready for use yet, so check back soon!**

## Roadmap

- [X] `QRData` Class
  - [X] Generate QR code images

- [X] `Design` Class
  - [X] Read QR properties from byte data
  - [X] Write QR properties to byte data
  - [X] Read design data from one or more `QRData` instances
  - [X] Write new design data back out to `QRData` instances
  - [ ] Convert normal images to AC designs, scaling and converting colors where necessary

- [X] `ColorPalette`/`Color` Classes
  - [X] Convert between AC colors and standard RGB colors

- [X] `Image` Class
  - [X] Convert AC design format to normal images
  - [X] Output PNG files/data URLs
  - [ ] Output to canvas elements
  - [X] Use xBRZ to smooth upscaled images

- [ ] Cleanup
  - [ ] Improve naming consistency between `to*` and `get*` methods
  - [ ] Improve consistency between QR image and rendered design image output methods
  - ~~[ ] Possibly rename `Color` to `ACColor` to indicate it's not just a generic color class~~
  - [X] Tests: Import classes from `'../src/index'`

- [ ] Write documentation and examples
