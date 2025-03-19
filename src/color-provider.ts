import * as vscode from "vscode";

import { ENABLED_LANGUAGES, SYNTAX_MATCH_REGEX } from "./constants";
import { HSLToRGB, RGBToHSL } from "./utils";

const colorProvider = vscode.languages.registerColorProvider(ENABLED_LANGUAGES, {
  provideDocumentColors(document: vscode.TextDocument): vscode.ColorInformation[] {
    const text = document.getText();
    const colors: vscode.ColorInformation[] = [];

    let match;
    while ((match = SYNTAX_MATCH_REGEX.exec(text)) !== null) {
      if (!match || match.length < 4) continue;

      const [, h, s, l] = match;
      const [r, g, b] = HSLToRGB(Number(h), Number(s.replace("%", "")), Number(l.replace("%", "")));

      // VS Code wants RGB values normalized to 0-1
      const color = new vscode.Color(r / 255, g / 255, b / 255, 1);
      const range = new vscode.Range(
        document.positionAt(match.index),
        document.positionAt(match.index + match[0].length),
      );

      colors.push(new vscode.ColorInformation(range, color));
    }

    return colors;
  },

  provideColorPresentations(color: vscode.Color): vscode.ColorPresentation[] {
    const [h, s, l] = RGBToHSL(color.red * 255, color.green * 255, color.blue * 255);
    console.debug("presentation", h, s, l);
    return [new vscode.ColorPresentation(`${h} ${s}% ${l}%`)];
  },
});

export const registerColorProvider = (context: vscode.ExtensionContext) =>
  context.subscriptions.push(colorProvider);
