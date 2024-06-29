import * as semver from "semver";
import * as vscode from "vscode";

import { GlobalStateManager } from "./state-manager";

const latestNewsVersion = "1.2.0";

const showNews = async (context: vscode.ExtensionContext) => {
  console.debug("shadcn-hsl-preview: Showing news");
  const panel = vscode.window.createWebviewPanel(
    "shadcnHslPreviewUpdateNews",
    "shadcn HSL Preview Update",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "news")],
    },
  );

  const file = vscode.Uri.joinPath(context.extensionUri, "news", "news.html");
  panel.webview.html = await vscode.workspace.fs.readFile(file).then((buffer) => buffer.toString());
};

export const handleUnseenUpdateNews = async (context: vscode.ExtensionContext, forced: boolean) => {
  const globalStateManager = new GlobalStateManager(context);
  const newsVersion = globalStateManager.getValue("NEWS_VERSION");
  console.debug("shadcn-hsl-preview: News version from storage", newsVersion);
  const currentVersion = context.extension.packageJSON?.version;
  if (!currentVersion) {
    console.debug("shadcn-hsl-preview: current version number is missing");
  }

  if (!semver.gt(latestNewsVersion, newsVersion || "0.0.0") && !forced) {
    console.debug("shadcn-hsl-preview: Not showing news");
    return;
  }

  vscode.window
    .showInformationMessage("We've been cookin!", "Show me the good stuff", "Nah 😔")
    .then((selection) => {
      if (selection === "Show me the good stuff") {
        showNews(context);
      }
    });
  globalStateManager.setValue("NEWS_VERSION", latestNewsVersion);
};
