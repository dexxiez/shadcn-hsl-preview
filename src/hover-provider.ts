import * as vscode from "vscode";

import { ENABLED_LANGUAGES, SYNTAX_MATCH_REGEX } from "./constants";
import { HSLToHEX, HSLToRGB } from "./utils";

export const registerHoverProvider = (context: vscode.ExtensionContext) => {
  const disposable = vscode.languages.registerHoverProvider(ENABLED_LANGUAGES, {
    provideHover(document: vscode.TextDocument, position: vscode.Position) {
      // Get the entire line at the current position
      const line = document.lineAt(position.line).text;

      // Reset regex before use
      SYNTAX_MATCH_REGEX.lastIndex = 0;

      // Find all HSL matches in the line
      let match;
      while ((match = SYNTAX_MATCH_REGEX.exec(line)) !== null) {
        if (!match || match.length < 4) continue;

        // Create a range for this match
        const startPos = new vscode.Position(position.line, match.index);
        const endPos = new vscode.Position(position.line, match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);

        // Check if hover position is within this HSL value
        if (!range.contains(position)) continue;

        const [, h, s, l] = match;
        const hValue = Number(h);
        const sValue = Number(s.replace("%", ""));
        const lValue = Number(l.replace("%", ""));

        const [r, g, b] = HSLToRGB(hValue, sValue, lValue);
        const hex = HSLToHEX(hValue, sValue, lValue);

        const content = new vscode.MarkdownString();
        content.appendCodeblock(`RGB: ${r}, ${g}, ${b}`, "typescript");
        content.appendCodeblock(`HEX: ${hex}`, "typescript");

        return new vscode.Hover(content, range);
      }

      return null;
    },
  });

  context.subscriptions.push(disposable);
};
