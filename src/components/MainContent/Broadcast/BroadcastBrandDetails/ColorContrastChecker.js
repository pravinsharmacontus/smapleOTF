// function from https://stackoverflow.com/a/5624139/3695983
// References
// https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o

function hexToRgb(_hex = "") {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const hex = _hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// function from https://stackoverflow.com/a/9733420/3695983

function luminance(r, g, b) {
  const a = [r, g, b].map(function (V) {
    let v = V;
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function colorContrastChecker(color1, color2) {
  if (
    color1 !== null &&
    color2 !== null &&
    (color1.length > 2 || color1.length > 5) &&
    (color2.length > 2 || color2.length > 5)
  ) {
    const color1rgb = hexToRgb(color1);
    const color2rgb = hexToRgb(color2);

    if (color1rgb !== null && color2rgb !== null) {
      // calculate the relative luminance
      const color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
      const color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);

      // calculate the color contrast ratio
      const ratio =
        color1luminance > color2luminance
          ? (color2luminance + 0.05) / (color1luminance + 0.05)
          : (color1luminance + 0.05) / (color2luminance + 0.05);
      // AA-level large text: ${ratio < 1/3 ? 'PASS' : 'FAIL' }
      // AA-level small text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }
      // AAA-level large text: ${ratio < 1/4.5 ? 'PASS' : 'FAIL' }
      // AAA-level small text: ${ratio < 1/7 ? PASS' : 'FAIL' }
      return ratio < 1/4.5;
    }
  }
}
