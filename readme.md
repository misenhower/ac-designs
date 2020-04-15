# ac-designs

This package makes it easy to generate and parse QR codes for Animal Crossing designs.

Many thanks to [ACNLPatternTool](https://github.com/Thulinma/ACNLPatternTool), which served as inspiration and reference for much of the design processing and data formatting code in this library.

**This isn't quite ready for use yet, so check back soon!**

## Roadmap

- [X] `QRData` Class
  - [X] Generate QR code images
  - [X] Switch image generation to node-canvas

- [X] `Design` Class
  - [X] Read QR properties from byte data
  - [X] Write QR properties to byte data
  - [X] Read design data from one or more `QRData` instances
  - [X] Write new design data back out to `QRData` instances
  - [ ] Convert normal images to AC designs, scaling and converting colors where necessary

- [X] `ColorPalette`/`Color` Classes
  - [X] Convert between AC colors and standard RGB colors

- [X] `IndexedImage` Classes
  - [X] Store the design's image data in a separate class
  - [X] Get/set the color index for individual pixels
  - [X] Get/set all color index values for each segment
  - [X] Enable compositing multiple image data segments together in an arbitrary layout
  - [ ] Enable modifying individual pixel bytes from the colorIndexes array on derived segments (via proxies)
  - [ ] Provide individual clothing segments (e.g. front/back/sleeves) based on the usage type

- [X] `Image` Class
  - [X] Convert AC design format to normal images
  - [X] Output PNG files/data URLs
  - [X] Output to canvas elements
  - [X] Use xBRZ to smooth upscaled images
  - [X] Switch to node-canvas

- [ ] Cleanup
  - [ ] Improve naming consistency between `to*` and `get*` methods
  - [X] Improve consistency between QR image and rendered design image output methods
  - [X] Update `Color` to make it more clear that color values are ACNH byte codes
  - [X] Tests: Import classes from `'../src/index'`
  - [ ] Improve error messages (e.g., show the expected/actual byte counts)
  - [ ] Rename fields called colorPalette to palette
  - [ ] Include the transparent color in ColorPalette
  - [ ] Change colorData/"color data" to image data

- [ ] Documentation/examples
  - [ ] Write documentation
  - [ ] Add node example
  - [X] Add Vue example
