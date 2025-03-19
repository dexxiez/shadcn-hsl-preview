import * as vscode from "vscode";

import { registerColorProvider } from "./color-provider";
import { registerCommands } from "./commands";
import { registerHoverProvider } from "./hover-provider";
import { handleUnseenUpdateNews } from "./news";

export function activate(context: vscode.ExtensionContext) {
  registerCommands(context);
  registerColorProvider(context);
  registerHoverProvider(context);
  handleUnseenUpdateNews(context, false);
}

export function deactivate() {}
