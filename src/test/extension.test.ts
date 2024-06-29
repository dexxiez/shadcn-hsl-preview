import * as assert from "assert";
import * as vscode from "vscode";

import { HEXToHSL, HSLToHEX, HSLToRGB, RGBToHEX, type TruncateOptions, truncate } from "../utils";

suite("Shadcn Preview Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("HSL Values Conversion", () => {
    assert.deepStrictEqual(HSLToRGB(0, 0, 0), [0, 0, 0]);
    assert.deepStrictEqual(HSLToRGB(142, 76, 36), [22, 162, 73]);
    assert.deepStrictEqual(HSLToRGB(0, 0, 100), [255, 255, 255]);
    assert.deepStrictEqual(HSLToRGB(0, 0, 50), [128, 128, 128]);
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
