// Adapted from PixelFilterJS:
// https://github.com/daelsepara/PixelFilterJS/blob/5711bc6818adfd4823d24db316a48a4ed9e126b3/js/Common.js

import { Init, Common } from './Common.js';

/* eslint-disable */

// Zenju's XBRz nX family of filters
var ScaleSize = class {

  constructor(scaler) {

    this.scaler = scaler;
    this.size = scaler.Scale();
  }
}

var ImagePointer = class {

  constructor(imageData) {

    this._imageData = imageData;
    this._offset = 0;
  }

  Position(offset) {

    this._offset = offset;
  }

  GetPixel() {

    return this._imageData[this._offset];
  }

  SetPixel(val) {

    this._imageData[this._offset] = val;
  }
}

var BlendType = class {

  // These blend types must fit into 2 bits.
  static get BlendNone() {

    return 0; //do not blend
  }

  static get BlendNormal() {

    return 1; //a normal indication to blend
  }

  static get BlendDominant() {

    return 2; //a strong indication to blend
  }
}

var BlendResult = class {

  constructor() {

    this.f = BlendType.BlendNone;
    this.g = BlendType.BlendNone;
    this.j = BlendType.BlendNone;
    this.k = BlendType.BlendNone;
  }

  Reset() {

    this.f = BlendType.BlendNone;
    this.g = BlendType.BlendNone;
    this.j = BlendType.BlendNone;
    this.k = BlendType.BlendNone;
  }
}

var ScalerCfg = class {

  // These are the default values:
  constructor() {

    this.luminanceWeight = 1.0;
    this.equalColorTolerance = 30.0;
    this.dominantDirectionThreshold = 3.6;
    this.steepDirectionThreshold = 2.2;
  }
}

var Tuple = class {

  constructor(i, j) {

    this.I = i;
    this.J = j;
  }
}

var Constants = class {

  static get Configuration() {

    return this.hasOwnProperty('_Configuration') ? this._Configuration : new ScalerCfg();
  }

  static get MAX_ROTS() {

    return this.hasOwnProperty('_MAX_ROTS') ? this._MAX_ROTS : 4;
  }

  static get MAX_SCALE() {

    return this.hasOwnProperty('_MAX_SCALE') ? this._MAX_SCALE : 6;
  }

  static get MAX_SCALE_SQUARED() {

    return this.hasOwnProperty('_MAX_SCALE_SQUARED') ? this._MAX_SCALE_SQUARED : this.MAX_SCALE * this.MAX_SCALE;
  }

  static get MATRIX_ROTATION() {

    return this.hasOwnProperty('_MATRIX_ROTATION') ? this._MATRIX_ROTATION : [];
  }

  static set MATRIX_ROTATION(v) {

    this._MATRIX_ROTATION = v;
  }

  static get USE_INTERP() {

    return this.hasOwnProperty('_USE_INTERP') ? this._USE_INTERP : false;
  }
}

var Utility = class {

  static getByte(val, N) {

    return (val >>> (8 * N)) & 0xff;
  }

  static _Square(value) {

    return (value * value);
  }
}

var ColorDistanceARGB = class {

  static val(i, luminanceWeight) {

    const r_diff = Utility.getByte(i, 2) * 2 - 255;
    const g_diff = Utility.getByte(i, 1) * 2 - 255;
    const b_diff = Utility.getByte(i, 0) * 2 - 255;

    const k_b = 0.0593; //ITU-R BT.2020 conversion
    const k_r = 0.2627; //
    const k_g = 1 - k_b - k_r;

    const scale_b = 0.5 / (1.0 - k_b);
    const scale_r = 0.5 / (1.0 - k_r);

    const y = k_r * r_diff + k_g * g_diff + k_b * b_diff; //[!], analog YCbCr!
    const c_b = scale_b * (b_diff - y);
    const c_r = scale_r * (r_diff - y);

    return parseFloat(Math.sqrt(Utility._Square(y * luminanceWeight) + Utility._Square(c_b) + Utility._Square(c_r)));
  }

  static DistYCbCr(pix1, pix2, lumaWeight) {

    //http://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.601_conversion
    //YCbCr conversion is a matrix multiplication => take advantage of linearity by subtracting first!
    var rDiff = Common.Red(pix1) - Common.Red(pix2);
    var gDiff = Common.Green(pix1) - Common.Green(pix2);
    var bDiff = Common.Blue(pix1) - Common.Blue(pix2);

    const kB = 0.0722; //ITU-R BT.709 conversion
    const kR = 0.2126; //
    const kG = 1 - kB - kR;

    const scaleB = 0.5 / (1.0 - kB);
    const scaleR = 0.5 / (1.0 - kR);

    var y = kR * rDiff + kG * gDiff + kB * bDiff; //[!], analog YCbCr!
    var cB = scaleB * (bDiff - y);
    var cR = scaleR * (rDiff - y);

    return Math.sqrt(Utility._Square(lumaWeight * y) + Utility._Square(cB) + Utility._Square(cR));
  }

  static DistYCbCrBuffer(pix1, pix2, luminanceWeight) {

    const r_diff = (Common.Red(pix1) - Common.Red(pix2));
    const g_diff = (Common.Green(pix1) - Common.Green(pix2));
    const b_diff = (Common.Blue(pix1) - Common.Blue(pix2));

    var i = (((r_diff + 255) / 2) << 16) | //slightly reduce precision (division by 2) to squeeze value into single byte
      (((g_diff + 255) / 2) << 8) |
      ((b_diff + 255) / 2);

    return this.val(i, luminanceWeight);
  }

  static dist(pix1, pix2, luminanceWeight) {

    if (Constants.USE_INTERP)
      return this.DistYCbCr(pix1, pix2, luminanceWeight);

    const a1 = Common.Alpha(pix1) / 255.0;
    const a2 = Common.Alpha(pix2) / 255.0;

    const d = this.DistYCbCrBuffer(pix1, pix2, luminanceWeight);

    if (a1 < a2)
      return a1 * d + 255 * (a2 - a1);
    else
      return a2 * d + 255 * (a1 - a2);

    //alternative?
    //return (a1 * a2 * Utility._Square(d) + Utility._Square(255 * (a1 - a2))) >>> 0;
  }
}

var IColorDist = class {

  _ColorDist(pix1, pix2, luminanceWeight) {

    return pix1 == pix2 ? 0 : ColorDistanceARGB.dist(pix1, pix2, luminanceWeight);
  }

  _(col1, col2) {

    return this._ColorDist(col1, col2, Constants.Configuration.luminanceWeight);
  }
}

var IColorEq = class {

  constructor(a) {

    this._eqColorThres = a;
  }

  _(col1, col2) {

    return ColorDistanceARGB.dist(col1, col2, Constants.Configuration.luminanceWeight) < this._eqColorThres;
  }
}

var Kernel_3X3 = class {

  constructor() {

    this._ = new Array(3 * 3);
    this._.fill(0);
  }
}

var Kernel_4X4 = class {

  constructor() {

    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = 0;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.i = 0;
    this.j = 0;
    this.k = 0;
    this.l = 0;
    this.m = 0;
    this.n = 0;
    this.o = 0;
    this.p = 0;
  }
}

/*
input kernel area naming convention:
-----------------
| A | B | C | D |
----|---|---|---|
| E | F | G | H | //evalute the four corners between F, G, J, K
----|---|---|---| //input pixel is at position F
| I | J | K | L |
----|---|---|---|
| M | N | O | P |
-----------------
*/

var RotationDegree = class {

  static get Rot0() {

    return 0;
  }

  static get Rot90() {

    return 1;
  }

  static get Rot180() {

    return 2;
  }

  static get Rot270() {

    return 3;
  }
}

var Rot = class {

  static get _() {

    return this.hasOwnProperty('_rot') ? this._rot : 0;
  }

  // Cache the 4 rotations of the 9 positions, a to i.
  static Initialize() {

    this._rot = new Array(9 * 4);

    this.a = 0, this.b = 1, this.c = 2, this.d = 3, this.e = 4, this.f = 5, this.g = 6, this.h = 7, this.i = 8;

    this.deg0 = [
      this.a, this.b, this.c,
      this.d, this.e, this.f,
      this.g, this.h, this.i
    ];

    this.deg90 = [
      this.g, this.d, this.a,
      this.h, this.e, this.b,
      this.i, this.f, this.c
    ];

    this.deg180 = [
      this.i, this.h, this.g,
      this.f, this.e, this.d,
      this.c, this.b, this.a
    ];

    this.deg270 = [
      this.c, this.f, this.i,
      this.b, this.e, this.h,
      this.a, this.d, this.g
    ];

    this.rotation = [this.deg0, this.deg90, this.deg180, this.deg270];

    for (var rotDeg = 0; rotDeg < 4; rotDeg++)
      for (var x = 0; x < 9; x++)
        this._rot[(x << 2) + rotDeg] = this.rotation[rotDeg][x];
  }
}

var BlendInfo = class {

  static GetTopL(b) {

    return b & 0x03;
  }

  static GetTopR(b) {

    return (b >> 2) & 0x03;
  }

  static GetBottomR(b) {

    return (b >> 4) & 0x03;
  }

  static GetBottomL(b) {

    return (b >> 6) & 0x03;
  }

  static SetTopL(b, bt) {

    return b | bt;
  }

  static SetTopR(b, bt) {

    return b | (bt << 2);
  }

  static SetBottomR(b, bt) {

    return b | (bt << 4);
  }

  static SetBottomL(b, bt) {

    return b | (bt << 6);
  }

  static Rotate(b, rotDeg) {

    var l = (rotDeg) << 1;
    var r = 8 - l;

    return (b << l) | (b >> r);
  }
}

var Alpha = class {

  static Grad(m, n, dstPtr, col) {

    dstPtr.SetPixel(Interpolate.Interpolate2P2Q(col, dstPtr.GetPixel(), m, n));
  }

  static Blend(m, n, dstPtr, col) {

    if (Constants.USE_INTERP) {

      this.Grad(m, n, dstPtr, col);

    } else {

      var calcColor = function (colFront, colBack) {

        return (colFront * weightFront + colBack * weightBack) / weightSum;
      }

      var p = dstPtr.GetPixel();

      const weightFront = Common.Alpha(col) * m;
      const weightBack = Common.Alpha(p) * (n - m);
      const weightSum = weightFront + weightBack;

      if (weightSum == 0) {

        dstPtr.SetPixel(0);

      } else {

        var a = weightSum / n;
        var r = calcColor(Common.Red(col), Common.Red(p));
        var g = calcColor(Common.Green(col), Common.Green(p));
        var b = calcColor(Common.Blue(col), Common.Blue(p));

        dstPtr.SetPixel(Common.ARGBINT(a, r, g, b));
      }
    }
  }
}

var OutputMatrix = class {

  constructor(scale, output, outWidth) {

    this._n = (scale - 2) * (Constants.MAX_ROTS * Constants.MAX_SCALE_SQUARED);
    this._output = new ImagePointer(output);
    this._outWidth = outWidth;
    this._nr = 0;
    this._outi = 0;
  }

  Move(rotDeg, outi) {

    this._nr = this._n + rotDeg * Constants.MAX_SCALE_SQUARED;
    this._outi = outi;
  }

  Reference(i, j) {

    var rot = Constants.MATRIX_ROTATION[this._nr + parseInt(i * Constants.MAX_SCALE + j)];
    this._output.Position(this._outi + rot.J + rot.I * this._outWidth);

    return this._output;
  }
}

var Scaler_2X = class {

  constructor() {

    this._SCALE = 2;
  }

  Scale() {

    return this._SCALE;
  }

  BlendLineShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
  }

  BlendLineSteep(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
  }

  BlendLineSteepAndShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(1, 0), col);
    Alpha.Blend(1, 4, output.Reference(0, 1), col);
    Alpha.Blend(5, 6, output.Reference(1, 1), col); //[!] fixes 7/8 used in xBR
  }

  BlendLineDiagonal(col, output) {

    Alpha.Blend(1, 2, output.Reference(1, 1), col);
  }

  BlendCorner(col, output) {

    //model a round corner
    Alpha.Blend(21, 100, output.Reference(1, 1), col); //exact: 1 - pi/4 = 0.2146018366
  }
}

var Scaler_3X = class {

  constructor() {

    this._SCALE = 3;
  }

  Scale() {

    return this._SCALE;
  }

  BlendLineShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
  }

  BlendLineSteep(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
  }

  BlendLineSteepAndShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(2, 0), col);
    Alpha.Blend(1, 4, output.Reference(0, 2), col);
    Alpha.Blend(3, 4, output.Reference(2, 1), col);
    Alpha.Blend(3, 4, output.Reference(1, 2), col);
    output.Reference(2, 2).SetPixel(col);
  }

  BlendLineDiagonal(col, output) {

    Alpha.Blend(1, 8, output.Reference(1, 2), col); //conflict with other rotations for this odd scale
    Alpha.Blend(1, 8, output.Reference(2, 1), col);
    Alpha.Blend(7, 8, output.Reference(2, 2), col); //
  }

  BlendCorner(col, output) {

    //model a round corner
    Alpha.Blend(45, 100, output.Reference(2, 2), col); //exact: 0.4545939598
    //Alpha.Blend( 7, 256, output.Reference(2, 1), col); //0.02826017254 -> negligible + avoid conflicts with other rotations for this odd scale
    //Alpha.Blend( 7, 256, output.Reference(1, 2), col); //0.02826017254
  }
}

var Scaler_4X = class {

  constructor() {

    this._SCALE = 4;
  }

  Scale() {

    return this._SCALE;
  }

  BlendLineShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 2, 3), col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 3).SetPixel(col);
  }

  BlendLineSteep(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    Alpha.Blend(3, 4, output.Reference(3, this._SCALE - 2), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
    output.Reference(3, this._SCALE - 1).SetPixel(col);
  }

  BlendLineSteepAndShallow(col, output) {

    Alpha.Blend(3, 4, output.Reference(3, 1), col);
    Alpha.Blend(3, 4, output.Reference(1, 3), col);
    Alpha.Blend(1, 4, output.Reference(3, 0), col);
    Alpha.Blend(1, 4, output.Reference(0, 3), col);
    Alpha.Blend(1, 3, output.Reference(2, 2), col); //[!] fixes 1/4 used in xBR
    output.Reference(3, 3).SetPixel(col);
    output.Reference(3, 2).SetPixel(col);
    output.Reference(2, 3).SetPixel(col);
  }

  BlendLineDiagonal(col, output) {

    Alpha.Blend(1, 2, output.Reference(this._SCALE - 1, this._SCALE / 2), col);
    Alpha.Blend(1, 2, output.Reference(this._SCALE - 2, this._SCALE / 2 + 1), col);
    output.Reference(this._SCALE - 1, this._SCALE - 1).SetPixel(col);
  }

  BlendCorner(col, output) {

    // model a round corner
    Alpha.Blend(68, 100, output.Reference(3, 3), col); //exact: 0.6848532563
    Alpha.Blend(9, 100, output.Reference(3, 2), col); //0.08677704501
    Alpha.Blend(9, 100, output.Reference(2, 3), col); //0.08677704501
  }
}

var Scaler_5X = class {

  constructor() {

    this._SCALE = 5;
  }

  Scale() {

    return this._SCALE;
  }

  BlendLineShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 3, 4), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 2, 3), col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 3).SetPixel(col);
    output.Reference(this._SCALE - 1, 4).SetPixel(col);
    output.Reference(this._SCALE - 2, 4).SetPixel(col);
  }

  BlendLineSteep(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(1, 4, output.Reference(4, this._SCALE - 3), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    Alpha.Blend(3, 4, output.Reference(3, this._SCALE - 2), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
    output.Reference(3, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 2).SetPixel(col);
  }

  BlendLineSteepAndShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    Alpha.Blend(2, 3, output.Reference(3, 3), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
    output.Reference(3, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 1).SetPixel(col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 3).SetPixel(col);
  }

  BlendLineDiagonal(col, output) {

    Alpha.Blend(1, 8, output.Reference(this._SCALE - 1, this._SCALE / 2), col);
    Alpha.Blend(1, 8, output.Reference(this._SCALE - 2, this._SCALE / 2 + 1), col);
    Alpha.Blend(1, 8, output.Reference(this._SCALE - 3, this._SCALE / 2 + 2), col);
    Alpha.Blend(7, 8, output.Reference(4, 3), col);
    Alpha.Blend(7, 8, output.Reference(3, 4), col);
    output.Reference(4, 4).SetPixel(col);
  }

  BlendCorner(col, output) {

    //model a round corner
    Alpha.Blend(86, 100, output.Reference(4, 4), col); //exact: 0.8631434088
    Alpha.Blend(23, 100, output.Reference(4, 3), col); //0.2306749731
    Alpha.Blend(23, 100, output.Reference(3, 4), col); //0.2306749731
    //Alpha.Blend(1, 64, output.Reference(4, 2), col); //0.01676812367 -> negligible + avoid conflicts with other rotations for this odd scale
    //Alpha.Blend(1, 64, output.Reference(2, 4), col); //0.01676812367
  }
}

var Scaler_6X = class {

  constructor() {

    this._SCALE = 6;
  }

  Scale() {

    return this._SCALE;
  }

  BlendLineShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 3, 4), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 2, 3), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 3, 5), col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 3).SetPixel(col);
    output.Reference(this._SCALE - 1, 4).SetPixel(col);
    output.Reference(this._SCALE - 1, 5).SetPixel(col);
    output.Reference(this._SCALE - 2, 4).SetPixel(col);
    output.Reference(this._SCALE - 2, 5).SetPixel(col);
  }

  BlendLineSteep(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(1, 4, output.Reference(4, this._SCALE - 3), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    Alpha.Blend(3, 4, output.Reference(3, this._SCALE - 2), col);
    Alpha.Blend(3, 4, output.Reference(5, this._SCALE - 3), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
    output.Reference(3, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 1).SetPixel(col);
    output.Reference(5, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 2).SetPixel(col);
    output.Reference(5, this._SCALE - 2).SetPixel(col);
  }

  BlendLineSteepAndShallow(col, output) {

    Alpha.Blend(1, 4, output.Reference(0, this._SCALE - 1), col);
    Alpha.Blend(1, 4, output.Reference(2, this._SCALE - 2), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 1), col);
    Alpha.Blend(3, 4, output.Reference(1, this._SCALE - 2), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 1, 0), col);
    Alpha.Blend(1, 4, output.Reference(this._SCALE - 2, 2), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 1, 1), col);
    Alpha.Blend(3, 4, output.Reference(this._SCALE - 2, 3), col);
    output.Reference(2, this._SCALE - 1).SetPixel(col);
    output.Reference(3, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 1).SetPixel(col);
    output.Reference(5, this._SCALE - 1).SetPixel(col);
    output.Reference(4, this._SCALE - 2).SetPixel(col);
    output.Reference(5, this._SCALE - 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 2).SetPixel(col);
    output.Reference(this._SCALE - 1, 3).SetPixel(col);
  }

  BlendLineDiagonal(col, output) {

    Alpha.Blend(1, 2, output.Reference(this._SCALE - 1, this._SCALE / 2), col);
    Alpha.Blend(1, 2, output.Reference(this._SCALE - 2, this._SCALE / 2 + 1), col);
    Alpha.Blend(1, 2, output.Reference(this._SCALE - 3, this._SCALE / 2 + 2), col);
    output.Reference(this._SCALE - 2, this._SCALE - 1).SetPixel(col);
    output.Reference(this._SCALE - 1, this._SCALE - 1).SetPixel(col);
    output.Reference(this._SCALE - 1, this._SCALE - 2).SetPixel(col);
  }

  BlendCorner(col, output) {

    //model a round corner
    Alpha.Blend(97, 100, output.Reference(5, 5), col); //exact: 0.9711013910
    Alpha.Blend(42, 100, output.Reference(4, 5), col); //0.4236372243
    Alpha.Blend(42, 100, output.Reference(5, 4), col); //0.4236372243
    Alpha.Blend(6, 100, output.Reference(5, 3), col); //0.05652034508
    Alpha.Blend(6, 100, output.Reference(3, 5), col); //0.05652034508
  }
}

export class Filter {

  constructor() {

    Constants.MATRIX_ROTATION = new Array((Constants.MAX_SCALE - 1) * Constants.MAX_SCALE_SQUARED * Constants.MAX_ROTS);

    for (var n = 2; n < Constants.MAX_SCALE + 1; n++) {
      for (var r = 0; r < Constants.MAX_ROTS; r++) {

        var nr = (n - 2) * (Constants.MAX_ROTS * Constants.MAX_SCALE_SQUARED) + r * Constants.MAX_SCALE_SQUARED;

        for (var i = 0; i < Constants.MAX_SCALE; i++) {
          for (var j = 0; j < Constants.MAX_SCALE; j++) {

            Constants.MATRIX_ROTATION[nr + i * Constants.MAX_SCALE + j] = this._BuildMatrixRotation(r, i, j, n);
          }
        }
      }
    }

    Rot.Initialize();
  }

  _BuildMatrixRotation(rotDeg, i, j, n) {

    var iOld = 0;
    var jOld = 0;

    if (rotDeg == 0) {

      iOld = i;
      jOld = j;

    } else {

      //old coordinates before rotation!
      var old = this._BuildMatrixRotation(rotDeg - 1, i, j, n);

      iOld = n - 1 - old.J;
      jOld = old.I;
    }

    return new Tuple(iOld, jOld);
  }

  Apply(Input, srcx, srcy, scale, threshold) {

    scale = Math.max(2, Math.min(scale, 6));

    Init.Init(srcx, srcy, scale, scale, threshold);

    // var src = Common.ToArray(Input, srcx, srcy);
    var src = Input;
    var dst = new Uint32Array(Common.SizeX * Common.SizeY);

    switch (scale) {

      case 3:

        this.ScaleImage(new ScaleSize(new Scaler_3X()), src, dst, srcx, srcy, 0, srcy)

        break;

      case 4:

        this.ScaleImage(new ScaleSize(new Scaler_4X()), src, dst, srcx, srcy, 0, srcy)

        break;

      case 5:

        this.ScaleImage(new ScaleSize(new Scaler_5X()), src, dst, srcx, srcy, 0, srcy)

        break;

      case 6:

        this.ScaleImage(new ScaleSize(new Scaler_6X()), src, dst, srcx, srcy, 0, srcy)

        break;

      default:

        this.ScaleImage(new ScaleSize(new Scaler_2X()), src, dst, srcx, srcy, 0, srcy)

        break;
    }

    // Common.ToImage(Common.ScaledImage, dst, Common.SizeX, Common.SizeY);
    return dst;
  }

  _FillBlock(trg, trgi, pitch, col, blockWidth, blockHeight) {

    for (var y = 0; y < blockHeight; ++y, trgi += pitch)
      for (var x = 0; x < blockWidth; ++x)
        trg[trgi + x] = col;
  }

  _PreProcessCorners(kernel, blendResult, preProcessCornersColorDist) {

    blendResult.Reset();

    if ((kernel.f == kernel.g && kernel.j == kernel.k) || (kernel.f == kernel.j && kernel.g == kernel.k))
      return;

    var dist = preProcessCornersColorDist;

    var weight = 4.0;
    var jg = dist._(kernel.i, kernel.f) + dist._(kernel.f, kernel.c) + dist._(kernel.n, kernel.k) + dist._(kernel.k, kernel.h) + weight * dist._(kernel.j, kernel.g);
    var fk = dist._(kernel.e, kernel.j) + dist._(kernel.j, kernel.o) + dist._(kernel.b, kernel.g) + dist._(kernel.g, kernel.l) + weight * dist._(kernel.f, kernel.k);

    var dominantGradient;

    if (jg < fk) {

      dominantGradient = Constants.Configuration.dominantDirectionThreshold * jg < fk;

      if (kernel.f != kernel.g && kernel.f != kernel.j)
        blendResult.f = dominantGradient ? BlendType.BlendDominant : BlendType.BlendNormal;

      if (kernel.k != kernel.j && kernel.k != kernel.g)
        blendResult.k = dominantGradient ? BlendType.BlendDominant : BlendType.BlendNormal;

    } else if (fk < jg) {

      dominantGradient = Constants.Configuration.dominantDirectionThreshold * fk < jg;

      if (kernel.j != kernel.f && kernel.j != kernel.k)
        blendResult.j = dominantGradient ? BlendType.BlendDominant : BlendType.BlendNormal;

      if (kernel.g != kernel.f && kernel.g != kernel.k)
        blendResult.g = dominantGradient ? BlendType.BlendDominant : BlendType.BlendNormal;
    }
  }

	/*
	input kernel area naming convention:
	-------------
	| A | B | C |
	----|---|---|
	| D | E | F | //input pixel is at position E
	----|---|---|
	| G | H | I |
	-------------
	*/

  blendPixel(scaler, rotDeg, ker, trgi, blendInfo, scalePixelColorEq, scalePixelColorDist, outputMatrix) {

    var b = ker._[Rot._[(1 << 2) + (rotDeg)]];
    var c = ker._[Rot._[(2 << 2) + (rotDeg)]];
    var d = ker._[Rot._[(3 << 2) + (rotDeg)]];
    var e = ker._[Rot._[(4 << 2) + (rotDeg)]];
    var f = ker._[Rot._[(5 << 2) + (rotDeg)]];
    var g = ker._[Rot._[(6 << 2) + (rotDeg)]];
    var h = ker._[Rot._[(7 << 2) + (rotDeg)]];
    var i = ker._[Rot._[(8 << 2) + (rotDeg)]];

    var blend = BlendInfo.Rotate(blendInfo, rotDeg);

    if ((BlendInfo.GetBottomR(blend)) >= BlendType.BlendNormal) {

      var eq = function (pix1, pix2) {

        return scalePixelColorEq._(pix1, pix2);
      }

      var dist = function (pix1, pix2) {

        return scalePixelColorDist._(pix1, pix2);
      }

      var doLineBlend = function () {

        if (BlendInfo.GetBottomR(blend) >= BlendType.BlendDominant)
          return true;

        //make sure there is no second blending in an adjacent rotation for this pixel: handles insular pixels, mario eyes
        if (BlendInfo.GetTopR(blend) != BlendType.BlendNone && !eq(e, g))
          return false;

        if (BlendInfo.GetBottomL(blend) != BlendType.BlendNone && !eq(e, c))
          return false;

        //no full blending for L-shapes; blend corner only (handles "mario mushroom eyes")
        if (!eq(e, i) && eq(g, h) && eq(h, i) && eq(i, f) && eq(f, c))
          return false;

        return true;
      }

      var px = dist(e, f) <= dist(e, h) ? f : h;

      var output = outputMatrix;

      output.Move(rotDeg, trgi);

      if (doLineBlend()) {

        var fg = dist(f, g); //test sample: 70% of values max(fg, hc) / min(fg, hc) are between 1.1 and 3.7 with median being 1.9
        var hc = dist(h, c); //

        var haveShallowLine = Constants.Configuration.steepDirectionThreshold * fg <= hc && e != g && d != g;
        var haveSteepLine = Constants.Configuration.steepDirectionThreshold * hc <= fg && e != c && b != c;

        if (haveShallowLine) {

          if (haveSteepLine) {

            scaler.BlendLineSteepAndShallow(px, output);

          } else {

            scaler.BlendLineShallow(px, output);
          }

        } else {

          if (haveSteepLine) {

            scaler.BlendLineSteep(px, output);

          } else {

            scaler.BlendLineDiagonal(px, output);
          }
        }

      } else {

        scaler.BlendCorner(px, output);
      }
    }
  }

  ScaleImage(scaleSize, src, trg, srcWidth, srcHeight, yFirst, yLast) {

    var x, y, blendResult, sM1, s0, sP1, sP2, xM1, xP1, xP2;

    yFirst = Math.max(yFirst, 0);
    yLast = Math.min(yLast, srcHeight);

    if (yFirst >= yLast || srcWidth <= 0)
      return;

    var trgWidth = srcWidth * scaleSize.size;

    //temporary buffer for "on the fly preprocessing"
    var preProcBuffer = new Uint8ClampedArray(srcWidth);
    preProcBuffer.fill(0);

    var ker3, ker4;

    var preProcessCornersColorDist = new IColorDist();

    //initialize preprocessing buffer for first row:
    //detect upper left and right corner blending
    //this cannot be optimized for adjacent processing
    //stripes; we must not allow for a memory race condition!
    if (yFirst > 0) {

      y = yFirst - 1;

      sM1 = srcWidth * Math.max(y - 1, 0);
      s0 = srcWidth * y; //center line
      sP1 = srcWidth * Math.min(y + 1, srcHeight - 1);
      sP2 = srcWidth * Math.min(y + 2, srcHeight - 1);

      for (x = 0; x < srcWidth; ++x) {

        xM1 = Math.max(x - 1, 0);
        xP1 = Math.min(x + 1, srcWidth - 1);
        xP2 = Math.min(x + 2, srcWidth - 1);

        ker4 = new Kernel_4X4();

        // read sequentially from memory as far as possible
        ker4.a = src[sM1 + xM1];
        ker4.b = src[sM1 + x];
        ker4.c = src[sM1 + xP1];
        ker4.d = src[sM1 + xP2];

        ker4.e = src[s0 + xM1];
        ker4.f = src[s0 + x];
        ker4.g = src[s0 + xP1];
        ker4.h = src[s0 + xP2];

        ker4.i = src[sP1 + xM1];
        ker4.j = src[sP1 + x];
        ker4.k = src[sP1 + xP1];
        ker4.l = src[sP1 + xP2];

        ker4.m = src[sP2 + xM1];
        ker4.n = src[sP2 + x];
        ker4.o = src[sP2 + xP1];
        ker4.p = src[sP2 + xP2];

        blendResult = new BlendResult();

        this._PreProcessCorners(ker4, blendResult, preProcessCornersColorDist); // writes to blendResult

				/*
				preprocessing blend result:
				---------
				| F | G | //evalute corner between F, G, J, K
				----|---| //input pixel is at position F
				| J | K |
				---------
				*/

        preProcBuffer[x] = BlendInfo.SetTopR(preProcBuffer[x], blendResult.j);

        if (x + 1 < srcWidth)
          preProcBuffer[x + 1] = BlendInfo.SetTopL(preProcBuffer[x + 1], blendResult.k);
      }
    }

    var equalColorTolerance = Constants.Configuration.equalColorTolerance;
    var scalePixelColorEq = new IColorEq(equalColorTolerance);
    var scalePixelColorDist = new IColorDist();
    var outputMatrix = new OutputMatrix(scaleSize.size, trg, trgWidth);

    var total = yLast - yFirst;
    var current = 0;

    for (y = yFirst; y < yLast; ++y) {

      //consider MT "striped" access
      var trgi = scaleSize.size * y * trgWidth;

      sM1 = srcWidth * Math.max(y - 1, 0);
      s0 = srcWidth * y; //center line
      sP1 = srcWidth * Math.min(y + 1, srcHeight - 1);
      sP2 = srcWidth * Math.min(y + 2, srcHeight - 1);

      var blendXy1 = 0;

      for (x = 0; x < srcWidth; ++x, trgi += scaleSize.size) {

        xM1 = Math.max(x - 1, 0);
        xP1 = Math.min(x + 1, srcWidth - 1);
        xP2 = Math.min(x + 2, srcWidth - 1);

        ker4 = new Kernel_4X4();

        //read sequentially from memory as far as possible
        ker4.a = src[sM1 + xM1];
        ker4.b = src[sM1 + x];
        ker4.c = src[sM1 + xP1];
        ker4.d = src[sM1 + xP2];

        ker4.e = src[s0 + xM1];
        ker4.f = src[s0 + x];
        ker4.g = src[s0 + xP1];
        ker4.h = src[s0 + xP2];

        ker4.i = src[sP1 + xM1];
        ker4.j = src[sP1 + x];
        ker4.k = src[sP1 + xP1];
        ker4.l = src[sP1 + xP2];

        ker4.m = src[sP2 + xM1];
        ker4.n = src[sP2 + x];
        ker4.o = src[sP2 + xP1];
        ker4.p = src[sP2 + xP2];

        //evaluate the four corners on bottom-right of current pixel
        //blend_xy for current (x, y) position
        var blendXy = 0;

        {
          blendResult = new BlendResult();

          this._PreProcessCorners(ker4, blendResult, preProcessCornersColorDist); // writes to blendResult

					/*
					preprocessing blend result:
					---------
					| F | G | //evaluate corner between F, G, J, K
					----|---| //current input pixel is at position F
					| J | K |
					---------
					*/

          //all four corners of (x, y) have been determined at
          //this point due to processing sequence!
          blendXy = BlendInfo.SetBottomR(preProcBuffer[x], blendResult.f);

          //set 2nd known corner for (x, y + 1)
          blendXy1 = BlendInfo.SetTopR(blendXy1, blendResult.j);
          //store on current buffer position for use on next row
          preProcBuffer[x] = blendXy1;

          //set 1st known corner for (x + 1, y + 1) and
          //buffer for use on next column
          blendXy1 = BlendInfo.SetTopL(0, blendResult.k);

          //set 3rd known corner for (x + 1, y)
          if (x + 1 < srcWidth)
            preProcBuffer[x + 1] = BlendInfo.SetBottomL(preProcBuffer[x + 1], blendResult.g);
        }

        //fill block of size scale * scale with the given color
        //place *after* preprocessing step, to not overwrite the
        //results while processing the the last pixel!
        this._FillBlock(trg, trgi, trgWidth, ker4.f, scaleSize.size, scaleSize.size);

        //blend four corners of current pixel
        if (blendXy == 0)
          continue;

        const a = 0,
          b = 1,
          c = 2,
          d = 3,
          e = 4,
          f = 5,
          g = 6,
          h = 7,
          i = 8;

        //read sequentially from memory as far as possible
        ker3 = new Kernel_3X3();

        ker3._[a] = ker4.a;
        ker3._[b] = ker4.b;
        ker3._[c] = ker4.c;

        ker3._[d] = ker4.e;
        ker3._[e] = ker4.f;
        ker3._[f] = ker4.g;

        ker3._[g] = ker4.i;
        ker3._[h] = ker4.j;
        ker3._[i] = ker4.k;

        this.blendPixel(scaleSize.scaler, RotationDegree.Rot0, ker3, trgi, blendXy, scalePixelColorEq, scalePixelColorDist, outputMatrix);
        this.blendPixel(scaleSize.scaler, RotationDegree.Rot90, ker3, trgi, blendXy, scalePixelColorEq, scalePixelColorDist, outputMatrix);
        this.blendPixel(scaleSize.scaler, RotationDegree.Rot180, ker3, trgi, blendXy, scalePixelColorEq, scalePixelColorDist, outputMatrix);
        this.blendPixel(scaleSize.scaler, RotationDegree.Rot270, ker3, trgi, blendXy, scalePixelColorEq, scalePixelColorDist, outputMatrix);
      }

      current++;

      // notify({ ScalingProgress: current / total });
    }
  }
}
