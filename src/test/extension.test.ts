import * as assert from "assert";
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";

import { HSLToHEX, HSLToRGB, RGBToHEX } from "../utils";

// import * as myExtension from '../../extension';

suite("ColorBlind Extension Test Suite", () => {
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
});
