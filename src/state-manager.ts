import * as vscode from "vscode";

const GLOBAL_STATE_KEYS = {
  NEWS_VERSION: "NEWS_VERSION",
} as const;

type GlobalStateKey = keyof typeof GLOBAL_STATE_KEYS;

type GlobalStateTypes = {
  NEWS_VERSION: string;
};

export class GlobalStateManager {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  setValue<K extends GlobalStateKey>(key: K, value: GlobalStateTypes[K]): Thenable<void> {
    return this.context.globalState.update(key, value);
  }

  getValue<K extends GlobalStateKey>(key: K): GlobalStateTypes[K] | undefined {
    return this.context.globalState.get<GlobalStateTypes[K]>(key);
  }

  resetAllValues(): Thenable<void> {
    const keys = this.context.globalState.keys();
    const promises = keys.map((key) => this.context.globalState.update(key, undefined));
    return Promise.all(promises).then(() => {});
  }
}
