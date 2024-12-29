export const HSLToRGB = (h: number, s: number, l: number) => {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
};

export const RGBToHEX = (r: number, g: number, b: number) => {
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const HSLToHEX = (h: number, s: number, l: number) => {
  const [r, g, b] = HSLToRGB(h, s, l);
  return RGBToHEX(r, g, b);
};

export const HEXToHSL = (hex: string): string | null => {
  // Remove the hash if present
  hex = hex.replace(/^#/, "");

  const validHex = /^([A-Fa-f0-9]{3}){1,2}$/;
  if (hex.length < 3 || hex.length > 6 || !validHex.test(hex)) {
    return null;
  }

  // Parse r, g, b values
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Convert to HSL
  const rPercent = r / 255;
  const gPercent = g / 255;
  const bPercent = b / 255;

  const max = Math.max(rPercent, gPercent, bPercent);
  const min = Math.min(rPercent, gPercent, bPercent);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rPercent:
        h = (gPercent - bPercent) / d + (gPercent < bPercent ? 6 : 0);
        break;
      case gPercent:
        h = (bPercent - rPercent) / d + 2;
        break;
      case bPercent:
        h = (rPercent - gPercent) / d + 4;
        break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
};

export const RGBToHSL = (r: number, g: number, b: number): [number, number, number] => {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;

  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    if (max === R) {
      h = ((G - B) / delta) % 6; // Only use %6 for red!
    } else if (max === G) {
      h = (B - R) / delta + 2; // No %6 needed for green
    } else {
      h = (R - G) / delta + 4; // No %6 needed for blue
    }
    h *= 60;
    if (h < 0) h += 360;

    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return [
    parseFloat(h.toFixed(1)),
    parseFloat((s * 100).toFixed(1)),
    parseFloat((l * 100).toFixed(1)),
  ];
};

export interface TruncateOptions {
  length?: number;
  omission?: string;
}

export const truncate = (rawStr: string, options?: TruncateOptions): string => {
  const { length = 30, omission = "..." } = options ?? {};

  const str = rawStr.trim();

  if (str.length <= length) {
    return str;
  }

  let maxLength = length - omission.length;
  if (maxLength < 0) {
    maxLength = 0;
  }

  const subString = str.slice(0, maxLength).trim();
  return `${subString.trim()}${omission}`;
};
