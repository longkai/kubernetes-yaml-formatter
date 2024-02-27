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
	// Set context as a global as some tests depend on it
  (global as any).testExtensionContext = context;

  // Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Congratulations, your extension "kubernetes-yaml-formatter-x" is now active!`);
  
	writeConfigFile(context);
	vscode.workspace.onDidChangeConfiguration(ev => {
      if (ev.affectsConfiguration('kubernetes-yaml-formatter-x')) {
        console.log(`rewrite config file since something changed just now`);
        writeConfigFile(context);
        return;
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
  const formatterType = conf.get('kubernetes-yaml-formatter-x.formatterType', 'basic');
  const retainLineBreaks = conf.get('kubernetes-yaml-formatter-x.retainLineBreaks', false);
  const retainLineBreaksSingle = conf.get('kubernetes-yaml-formatter-x.retainLineBreaksSingle', false);
  const scanFoldedAsLiteral = conf.get('kubernetes-yaml-formatter-x.scanFoldedAsLiteral', false);
  const indentlessArrays = conf.get('kubernetes-yaml-formatter-x.indentlessArrays', false);
  const disallowAnchors = conf.get('kubernetes-yaml-formatter-x.disallowAnchors', false);
  const maxLineLength = conf.get('kubernetes-yaml-formatter-x.maxLineLength', 80);
  const dropMergeTag = conf.get('kubernetes-yaml-formatter-x.dropMergeTag', false);
  const padLineComments = conf.get('kubernetes-yaml-formatter-x.padLineComments', false);
	const includeDocumentStart = conf.get('kubernetes-yaml-formatter-x.includeDocumentStart', false);
	const compactSequenceIndent = conf.get('kubernetes-yaml-formatter-x.compactSequenceIndent', true);
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
  type: ${formatterType}
  indent: ${tabSize}
  line_ending: ${eof}
  retain_line_breaks: ${retainLineBreaks}
  retain_line_breaks_single: ${retainLineBreaksSingle}
  scan_folded_as_literal: ${scanFoldedAsLiteral}
  include_document_start: ${includeDocumentStart}
  indentless_arrays: ${indentlessArrays}
  disallow_anchors: ${disallowAnchors}
  max_line_length: ${maxLineLength}
  drop_merge_tag: ${dropMergeTag}
  pad_line_comments: ${padLineComments}

`);
    console.error(`write config file to ${file}`);
	} catch (err) {
		console.error(`write config: ${err}`);
		vscode.window.showErrorMessage(`Write config file: ${err}`);
	}
}

export function configFileLocation(context: vscode.ExtensionContext): string | undefined {
	let fsPath = context.storageUri?.fsPath;
  console.error(`fsPath: ${fsPath}`);
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
export function deactivate(context: vscode.ExtensionContext) {
  const file = configFileLocation(context);
  if (file) {
    try {
      fs.unlinkSync(file);
    } catch (err) {
      console.error(`unlink ${file}: ${err}`);
    }
  } else {
    console.error(`Cannot get extension storage uri path`);
  }
}
