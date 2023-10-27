import * as vscode from "vscode";


export function getLineText(editor: vscode.TextEditor): string {
  const position = editor.selection.active.line;
  const line = editor.document.lineAt(position);
  return line.text as string;
};


export function matchStr(text: string): string {
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

// export class CopyLine {
//   // public function
//   public run = () => {
//     // Get the active text editor
//     const editor = vscode.window.activeTextEditor;
//     if (editor) {
//       const str = getLineText(editor);
//       const result = matchStr(str);

//       if (result !== "") {
//         vscode.env.clipboard.writeText(result);
//       };

//       moveCursorNextLine(editor);
//     }
//   };
// }


