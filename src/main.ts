import * as vscode from "vscode";

export class CopyLine {
  // functions
  private getLineText = (editor: vscode.TextEditor): string => {
    const position = editor.selection.active.line;
    const line = editor.document.lineAt(position);
    return line.text as string;
  };

  private matchStr = (text: string): string => {
    const regexp1 = /^\s*(-|\+|\*|\(?[A-Za-z0-9]*\)?\.?)\s+(.+)/;
    const regexp2 = /^(.+?)\s*$/;
    const regexp3 = /^(.+?)\s+(#*|[○×]*)$/;

    const match = text.replace(regexp1, "$2")
                      .replace(regexp2, "$1")
                      .replace(regexp3, "$1");
    return match as string;
  };

  // move cursor to next line
  // https://code.visualstudio.com/api/references/commands
  private moveCursorNextLine = (_editor: vscode.TextEditor) => {
    vscode.commands.executeCommand<void>("cursorMove", {
      to: "wrappedLineStart",
      by: "line"
    });
    return vscode.commands.executeCommand<void>("cursorMove", {
      to: "down",
      by: "line"
    });
  };

  // public function
  public run = () => {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const str = this.getLineText(editor);
      const result = this.matchStr(str);

      if (result !== "") {
        vscode.env.clipboard.writeText(result);
      };

      this.moveCursorNextLine(editor);
    }
  };
}
