import * as vscode from "vscode";

// remove leading bullet point symbol
const regexp1 = /^\s*(-|\+|\*|\(?[A-Za-z0-9]*[\)?|\.?])(\s+.+)/;

// remove leading half-width spaces and tabs
const regexp2 = /^[\x20\t]*(.+)/;
// \x20: half-width spaces
// \u3000: full-width spaces

// remove last half-width spaces and tabs
const regexp3 = /[\x20\t]+$/;

// remove last symbols
const regexp4 = /^(.+?)\s+(#*|[○×]*)$/;



export function getLineText(editor: vscode.TextEditor): string {
  const position = editor.selection.active.line;
  const line = editor.document.lineAt(position);
  return line.text as string;
};


export function matchStr(str: string): string {
  const match = str.replace(regexp1, "$2")
                   .replace(regexp2, "$1")
                   .replace(regexp3, "")
                   .replace(regexp4, "$1");
  return match as string;
};


// move cursor to next line
// https://code.visualstudio.com/api/references/commands
export function moveCursorNextLine(_editor: vscode.TextEditor) {
  vscode.commands.executeCommand<void>("cursorMove", {
    to: "wrappedLineStart",
    by: "line"
  });

  return vscode.commands.executeCommand<void>("cursorMove", {
    to: "down",
    by: "line"
  });
};


// main function
export function copyLine() {
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const str = getLineText(editor);
    const result = matchStr(str);

    if (result !== "") {
      vscode.env.clipboard.writeText(result);
    };

    moveCursorNextLine(editor);
  }
};
