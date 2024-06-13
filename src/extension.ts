import * as vscode from "vscode";

import { HSLToHEX, HSLToRGB } from "./utils";

const decorationType: vscode.TextEditorDecorationType =
  vscode.window.createTextEditorDecorationType({});

export function activate(context: vscode.ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      updateDecorations(editor);
    },
    null,
    context.subscriptions,
  );

  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      if (
        vscode.window.activeTextEditor &&
        event.document === vscode.window.activeTextEditor.document
      ) {
        updateDecorations(vscode.window.activeTextEditor);
      }
    },
    null,
    context.subscriptions,
  );

  const updateDecorations = (editor?: vscode.TextEditor) => {
    if (!editor) {
      return;
    }

    const languageId = editor.document.languageId;
    if (languageId !== "css" && languageId !== "tailwindcss") {
      return;
    }
    const text = editor.document.getText();
    const regex =
      /--[\w-]+:[ \t]+?(\d{1,3}(?:\.\d)?)[ \t]+?(\d{1,3}(?:\.\d)?\%)[ \t]+?(\d{1,3}(?:\.\d)?\%)/g;
    const decorations: vscode.DecorationOptions[] = [];

    let match;
    while ((match = regex.exec(text)) !== null) {
      if (!match || match.length < 4) {
        continue;
      }
      const [, h, s, l] = match;
      const [r, g, b] = HSLToRGB(Number(h), Number(s.replace("%", "")), Number(l.replace("%", "")));
      const hex = HSLToHEX(Number(h), Number(s.replace("%", "")), Number(l.replace("%", "")));
      const startPos = editor.document.positionAt(match.index);
      const endPos = editor.document.positionAt(match.index + match[0].length);
      const decoration = {
        range: new vscode.Range(startPos, endPos),
        hoverMessage: `rgb(${r}, ${g}, ${b}) | hex: ${hex.toUpperCase()}`,
        renderOptions: {
          after: {
            contentText: "",
            backgroundColor: `rgb(${r}, ${g}, ${b})`,
            height: "15px",
            width: "15px",
            margin: "0 3px 0 3px",
            border: "1px solid rgba(0, 0, 0, 0.2)",
          },
        } as vscode.DecorationRenderOptions,
      };
      decorations.push(decoration);
    }

    editor.setDecorations(decorationType, decorations);
  };
}

export function deactivate() {
  decorationType.dispose();
}
