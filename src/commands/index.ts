import * as vscode from "vscode";

import { ENABLED_LANGUAGES } from "../constants";
import { HEXToHSL, truncate } from "../utils";

export class Command {
  command: string;
  callback: (...args: any[]) => any;
  constructor(command: string, callback: (...args: any[]) => any) {
    this.command = `shadcn-hsl-preview.${command}`;
    this.callback = callback;
  }
}

export class ConvertToHslCommand extends Command {
  constructor() {
    super("convertToHSL", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      // Check if the current language is supported, we don't want to accidently mutilate other languages
      if (!ENABLED_LANGUAGES.includes(editor.document.languageId)) {
        vscode.window
          .showWarningMessage(
            "This action is not currently supported for this language",
            "Think it should?",
          )
          .then((selection) => {
            if (selection === "Think it should?") {
              vscode.env.openExternal(
                vscode.Uri.parse("https://github.com/dexxiez/shadcn-hsl-preview/issues"),
              );
            }
          });
      }

      // Check if there is a selection or we'll use the line the cursor is on
      const selection = editor.selection;
      let text = editor.document.getText(
        selection.isEmpty ? editor.document.lineAt(selection.start.line).range : selection,
      );
      const rangeToReplace =
        selection.isEmpty ? editor.document.lineAt(selection.start.line).range : selection;

      // The regex to match the hex colors
      const regex = /#(?:[0-9a-fA-F]{3}){1,2}/g;
      const hex = text.match(regex);
      if (!hex) {
        vscode.window.showInformationMessage("No hex colors found in selection or current line");
        return;
      }

      // Convert the hex colors to HSL and find and replace in order
      const hsls = hex.map((color) => {
        const hsl = HEXToHSL(color);
        return hsl;
      });

      hsls.forEach((hsl, index) => {
        if (!hsl) {
          vscode.window.showWarningMessage(
            `Failed to convert ${truncate(`element ${index}`, { length: 10 })} to HSL`,
          );
          return;
        }
        text = text.replace(hex[index], hsl);
      });

      // Replace the text in the editor from the range
      editor.edit((editBuilder) => {
        editBuilder.replace(rangeToReplace, text);
      });
    });
  }
}

export const registerCommands = (context: vscode.ExtensionContext) => {
  console.debug("shadcn-hsl-preview: Registering commands");
  const commands = [new ConvertToHslCommand()];
  commands.forEach((command) => {
    context.subscriptions.push(vscode.commands.registerCommand(command.command, command.callback));
  });
};
