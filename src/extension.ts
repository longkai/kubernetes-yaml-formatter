// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as YAML from "yaml";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "kubernetes-yaml-formatter" is now active!`);

	vscode.workspace.onDidChangeConfiguration(ev => {
		console.debug(`onDidChangeConfiguration: ${ev}`)
	});

	// 👍 formatter implemented using API
	vscode.languages.registerDocumentFormattingEditProvider('yaml', {
		provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions): vscode.TextEdit[] {
			const txt = document.getText();

			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(txt.length),
			);

			let fmtTxt = format(txt, makeFormattingOptions(vscode.workspace.getConfiguration(), options));

			return [vscode.TextEdit.replace(fullRange, fmtTxt)];
		}
	});

	vscode.languages.registerDocumentRangeFormattingEditProvider('yaml', {
		provideDocumentRangeFormattingEdits: function (document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
			const txt = document.getText(range);

			let fmtTxt = format(txt, makeFormattingOptions(vscode.workspace.getConfiguration(), options));

			if (txt.slice(-1) !== '\n') {
				fmtTxt = fmtTxt.slice(0, -1); // remove last `\n` or it may break the range
			}

			return [vscode.TextEdit.replace(range, fmtTxt)];
		}
	})
}

function makeFormattingOptions(conf:vscode.WorkspaceConfiguration, options: vscode.FormattingOptions): YAML.ToStringOptions {
	return {
		indent: options.tabSize,
		indentSeq: !conf.get('kubernetes-yaml-formatter.compactSequenceIndent', true),
	}
}

function format(text: string, options: YAML.ToStringOptions): string {
	return YAML.parseAllDocuments(text)
		.map(doc => YAML.stringify(doc, options))
		.join("\n---\n");
}

// this method is called when your extension is deactivated
export function deactivate() { }
