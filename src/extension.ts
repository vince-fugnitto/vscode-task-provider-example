import * as vscode from 'vscode';
import { TestTaskProvider } from './task-provider';

export function activate(context: vscode.ExtensionContext) {
    if (vscode.workspace.workspaceFolders?.length) {
        vscode.tasks.registerTaskProvider('vince', new TestTaskProvider);
    }
}

export function deactivate() { }
