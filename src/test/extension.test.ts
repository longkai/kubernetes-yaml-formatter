import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as k8sFormatter from '../extension';

// Test that the config options are being written to the file
suite('Config File Test Suite', () => {
  vscode.window.showInformationMessage('Start Config tests.');
  let extensionContext: vscode.ExtensionContext;
  suiteSetup(async () => {
      // Trigger extension activation and grab the context as some tests depend on it
      await vscode.extensions.getExtension('vscode.vscode-api-tests')?.activate();
      extensionContext = (global as any).testExtensionContext;
  });

  test('Config file is written', async () => {
    // Test that the config file is being written
  });
  test('Config file is being read', async () => {
    // Test that the config file is being read
  });
  test('Config file is being updated', () => {
    // Test that the config file is being updated
  });
  test('Config file is being deleted', () => {
    // Test that the config file is being deleted
  });
  suiteTeardown(() => {
    vscode.window.showInformationMessage('All config tests done!');
  });
});

// Test that the formatter is being called
suite('Formatter Test Suite', () => {
  vscode.window.showInformationMessage('Start Formatter tests.');
  let extensionContext: vscode.ExtensionContext;
  suiteSetup(async () => {
      // Trigger extension activation and grab the context as some tests depend on it
      await vscode.extensions.getExtension('vscode.vscode-api-tests')?.activate();
      extensionContext = (global as any).testExtensionContext;
  });

  test('Formatter is being called', async () => {
    // Test that the formatter is being called
  });
  test('Formatter is being called with the correct options', async () => {
    // Test that the formatter is being called with the correct options
  });
  test('Formatter is being called with changed options', async () => {
    // Test that the formatter is being called with changed options
  });
  suiteTeardown(() => {
    vscode.window.showInformationMessage('All formatter tests done!');
  });
});