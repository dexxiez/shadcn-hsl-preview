import * as vscode from "vscode";

import { ENABLED_LANGUAGES } from "../constants";

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
