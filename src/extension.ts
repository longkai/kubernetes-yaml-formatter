// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as YAML from "yaml";
import * as ts from "typescript";

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
	vscode.languages.registerDocumentFormattingEditProvider(['yaml', 'helm', 'ansible'], {
		provideDocumentFormattingEdits(document: vscode.TextDocument, options: vscode.FormattingOptions): vscode.TextEdit[] {
			const txt = document.getText();

			const fullRange = new vscode.Range(
				document.positionAt(0),
				document.positionAt(txt.length),
			);

			let fmtTxt = format(txt, makeFormattingOptions(vscode.workspace.getConfiguration(), options, false));

			return [vscode.TextEdit.replace(fullRange, fmtTxt)];
		}
	});

	vscode.languages.registerDocumentRangeFormattingEditProvider(['yaml', 'helm', 'ansible'], {
		provideDocumentRangeFormattingEdits: function (document: vscode.TextDocument, range: vscode.Range, options: vscode.FormattingOptions, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TextEdit[]> {
			const txt = document.getText(range);

			let fmtTxt = format(txt, makeFormattingOptions(vscode.workspace.getConfiguration(), options, true));

			if (txt.slice(-1) !== '\n') {
				fmtTxt = fmtTxt.slice(0, -1); // remove last `\n` or it may break the range
			}

			return [vscode.TextEdit.replace(range, fmtTxt)];
		}
	})
}

function makeFormattingOptions(conf: vscode.WorkspaceConfiguration, options: vscode.FormattingOptions, rangeFormatting: Boolean): YAML.ToStringOptions {
	let op: YAML.ToStringOptions = {
		indent: options.tabSize,
		indentSeq: conf.get('better-yaml.indentSeq'),
		directives: conf.get('better-yaml.directives'),
	}
	const commentString: string | undefined | null = conf.get('better-yaml.commentString')
	if (commentString != null && commentString != undefined) {
		const js = ts.transpile(commentString);
		op.commentString = eval(js);
	}

	if (rangeFormatting) {
		op.directives = null;
	}

	return op;
}

function format(text: string, options: YAML.ToStringOptions): string {
	return YAML.parseAllDocuments(text)
		.map(doc => YAML.stringify(doc, options))
		.join("");
}

// this method is called when your extension is deactivated
export function deactivate() { }
