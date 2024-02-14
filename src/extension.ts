// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as process from 'child_process';
import { platform } from 'node:process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "kubernetes-yaml-formatter" is now active!`);

	writeConfigFile(context);
	vscode.workspace.onDidChangeConfiguration(ev => {
		let affected = ev.affectsConfiguration(`kubernetes-yaml-formatter.compactSequenceIndent`);
		if (!affected) {
			affected = ev.affectsConfiguration(`files.eol`);
		}
		if (!affected) {
			affected = ev.affectsConfiguration(`kubernetes-yaml-formatter.includeDocumentStart`);
		}
		if (!affected) {
			affected = ev.affectsConfiguration(`kubernetes-yaml-formatter.padLineComments`);
		}

		if (affected) {
			console.log(`rewrite config file since something changed just now`);
			writeConfigFile(context);
		}
	});

	// 👍 formatter implemented using API
	vscode.languages.registerDocumentFormattingEditProvider('yaml', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const txt = document.getText();
			let args = [`-in`];
			const confFile = configFileLocation(context);
			if (confFile) {
				args.push(`-conf`);
				args.push(confFile);
			}
			// __dirname is `out`, so go back one level
			let cmd = path.join(path.dirname(__dirname), 'bin', 'yamlfmt');
			if (platform === 'win32') {
				cmd = path.join(path.dirname(__dirname), 'bin', 'yamlfmt.exe');
			}
			const sp = process.spawnSync(cmd, args, {
				input: txt,
			});
			if (sp.status !== 0) {
				console.error(`format ${txt} fail: ${sp.stderr.toString()}`);
				return [];
			}

			const edits = vscode.TextEdit.replace(
				new vscode.Range(
					new vscode.Position(0, 0),
					new vscode.Position(document.lineCount, document.lineAt(document.lineCount - 1).text.length)
				), sp.stdout.toString(),
			);
			return [edits];
		}
	});
}

function writeConfigFile(context: vscode.ExtensionContext) {
	const file = configFileLocation(context);
	if (!file) {
		console.error(`cannot get extension storage uri path`);
		return;
	}
	const tabSize = vscode.workspace.getConfiguration("", {
		languageId: `yaml`,
	}).get(`editor.tabSize`, 2);
	let conf = vscode.workspace.getConfiguration();
	const includeDocumentStart = conf.get('kubernetes-yaml-formatter.includeDocumentStart', false);
	const compactSequenceIndent = conf.get('kubernetes-yaml-formatter.compactSequenceIndent', true);
	const padLineComments = conf.get('kubernetes-yaml-formatter.padLineComments', 1);
	let eof = "~";
	switch (conf.get('files.eol')) {
		case "\n":
			eof = "lf";
			break;
		case "\r\n":
			eof = "crlf";
			break;
		default:
			eof = "~";
			break;
	}
	try {
		fs.writeFileSync(file, `formatter:
  type: basic
  indent: ${tabSize}
  line_ending: ${eof}
  retain_line_breaks: true
  compact_sequence_indent: ${compactSequenceIndent}
  include_document_start: ${includeDocumentStart}
  pad_line_comments: ${padLineComments}
`);
	} catch (err) {
		console.error(`write config: ${err}`);
		vscode.window.showErrorMessage(`write config file: ${err}`);
	}
}

function configFileLocation(context: vscode.ExtensionContext): string | undefined {
	let fsPath = context.storageUri?.fsPath;
	if (!fsPath) {
		try {
			fsPath = path.join(os.tmpdir(), context.extension.id);
			if (!fs.existsSync(fsPath)) {
				fs.mkdirSync(fsPath);
			}
		} catch (err) {
			throw new Error(`create tmp dir: ${err}`);
		}
		// maybe we are in the dev/debug mode.
		console.log(`cannot get extension storage uri fs path, fallback ${fsPath}`);
	}
	try {
		fs.mkdirSync(fsPath, { recursive: true });
	} catch (err) {
		console.error(`mkdir ${fsPath}: ${err}`);
		vscode.window.showErrorMessage(`mkdir extension storage uri path ${fsPath}: ${err}`);
	}
	return path.join(fsPath, "config.yaml");
}

// this method is called when your extension is deactivated
export function deactivate() { }
