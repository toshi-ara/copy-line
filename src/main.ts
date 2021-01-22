import * as vscode from 'vscode';

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

    const match1 = text.replace(regexp1, "$2");
    const match2 = match1.replace(regexp2, "$1");
    const match3 = match2.replace(regexp3, "$1");

    return match3 as string;
  };

  // move cursor to next line
  // https://github.com/microsoft/vscode/issues/111#issuecomment-157998910
  private moveCursorNextLine = (editor: vscode.TextEditor) => {
    const position = editor.selection.active;
    const currentLineNumber = position.line;
    const maxLineNumber = editor.document.lineCount;

    const newLineNumber = Math.min(currentLineNumber + 1, maxLineNumber - 1);
    const newPosition = position.with(newLineNumber, 0);
    const newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
  };

  // public function
  public run = () => {
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const str = this.getLineText(editor);
      const result = this.matchStr(str);

      if (result !== '') {
        vscode.env.clipboard.writeText(result);
      };

      this.moveCursorNextLine(editor);
    }
  };
}
