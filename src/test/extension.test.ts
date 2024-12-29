import * as assert from "assert";
import * as vscode from "vscode";

import {
  HEXToHSL,
  HSLToHEX,
  HSLToRGB,
  RGBToHEX,
  RGBToHSL,
  type TruncateOptions,
  truncate,
} from "../utils";

suite("Shadcn Preview Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("HSL Values Conversion", () => {
    assert.deepStrictEqual(HSLToRGB(0, 0, 0), [0, 0, 0]);
    assert.deepStrictEqual(HSLToRGB(142, 76, 36), [22, 162, 73]);
    assert.deepStrictEqual(HSLToRGB(0, 0, 100), [255, 255, 255]);
    assert.deepStrictEqual(HSLToRGB(0, 0, 50), [128, 128, 128]);
    assert.deepStrictEqual(HSLToRGB(0, 84.2, 60.2), [239, 68, 68]);
  });

  test("HEX Values Conversion", () => {
    assert.strictEqual(RGBToHEX(0, 0, 0), "#000000");
    assert.strictEqual(RGBToHEX(255, 255, 255), "#ffffff");
    assert.strictEqual(RGBToHEX(128, 128, 128), "#808080");
    assert.strictEqual(RGBToHEX(22, 162, 73), "#16a249");
    assert.strictEqual(RGBToHEX(54, 34, 156), "#36229c");
  });

  test("HSL to HEX Conversion", () => {
    assert.strictEqual(HSLToHEX(0, 0, 0), "#000000");
    assert.strictEqual(HSLToHEX(142, 76, 36), "#16a249");
    assert.strictEqual(HSLToHEX(0, 0, 100), "#ffffff");
    assert.strictEqual(HSLToHEX(0, 0, 50), "#808080");
    assert.strictEqual(HSLToHEX(250, 64.2, 37.3), "#36229c");
  });

  test("HEX to HSL Conversion", () => {
    assert.strictEqual(HEXToHSL("#000000"), "0 0% 0%");
    assert.strictEqual(HEXToHSL("#ffffff"), "0 0% 100%");
    assert.strictEqual(HEXToHSL("ff0000"), "0 100% 50%");
    assert.strictEqual(HEXToHSL("#46745d"), "150 25% 36%");
    assert.strictEqual(HEXToHSL("#f16c0a"), "25 92% 49%");
    assert.strictEqual(HEXToHSL("#NULL ME PLEASE"), null);
  });

  test("HSL to RGB Conversion", () => {
    assert.deepStrictEqual(RGBToHSL(255, 0, 0), [0, 100, 50]); // Pure red
    assert.deepStrictEqual(RGBToHSL(0, 255, 0), [120, 100, 50]); // Pure green
    assert.deepStrictEqual(RGBToHSL(0, 0, 255), [240, 100, 50]); // Pure blue

    // Grays - these are tricky bastards because hue is undefined
    assert.deepStrictEqual(RGBToHSL(128, 128, 128), [0, 0, 50.2]); // Mid gray
    assert.deepStrictEqual(RGBToHSL(0, 0, 0), [0, 0, 0]); // Black
    assert.deepStrictEqual(RGBToHSL(255, 255, 255), [0, 0, 100]); // White

    // Mixed colors that tend to break shit
    assert.deepStrictEqual(RGBToHSL(128, 0, 128), [300, 100, 25.1]); // Purple
    assert.deepStrictEqual(RGBToHSL(64, 224, 208), [174, 72.1, 56.5]); // Turquoise

    // Edge case: very close values that might get rounded weird
    assert.deepStrictEqual(RGBToHSL(100, 100, 101), [240, 0.5, 39.4]);
    assert.deepStrictEqual(RGBToHSL(239, 68, 68), [0, 84.2, 60.2]);

    assert.deepStrictEqual(RGBToHSL(239, 68, 68), [0, 84.2, 60.2]); // Red max
    assert.deepStrictEqual(RGBToHSL(74, 222, 128), [141.9, 69.2, 58]); // Green max
    assert.deepStrictEqual(RGBToHSL(73, 184, 201), [188, 54.2, 53.7]); // Blue max
  });

  test("Truncate without options", () => {
    assert.strictEqual(truncate("Hello, World!"), "Hello, World!");
    assert.strictEqual(
      truncate("This is a very long string that needs to be truncated."),
      "This is a very long string...",
    );
  });

  test("Truncate with length option", () => {
    const options: TruncateOptions = { length: 10 };
    assert.strictEqual(truncate("Hello, World!", options), "Hello,...");
  });

  test("Truncate with omission option", () => {
    const options: TruncateOptions = { omission: "~~~" };
    assert.strictEqual(
      truncate("This is a very long string that needs to be truncated.", options),
      "This is a very long string~~~",
    );
  });

  test("Truncate with all options", () => {
    const options: TruncateOptions = { length: 15, omission: "..." };
    assert.strictEqual(
      truncate("This is a very long string that needs to be truncated.", options),
      "This is a ve...",
    );
  });
});
