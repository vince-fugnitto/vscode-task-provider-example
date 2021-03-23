import * as vscode from 'vscode';

export interface TestTaskDefinition extends vscode.TaskDefinition {
    /**
     * The task name.
     */
    task: string;
}

export class TestTaskProvider implements vscode.TaskProvider {

    provideTasks(_token: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
        return getTestTasks();
    }

    resolveTask(task: vscode.Task, _token: vscode.CancellationToken): vscode.Task | undefined {
        return task;
    }
}

export function getTestTasks(): Promise<vscode.Task[]> {
    const tasks: vscode.Task[] = [];
    tasks.push(getTestTask());
    tasks.push(getBuildTask());
    tasks.push(getRebuildTask());
    tasks.push(getCleanTask());
    tasks.push(getNoneTask());
    return Promise.resolve(tasks);
}

function getTestTask(): vscode.Task {
    const workspaceFolder = vscode.workspace.workspaceFolders![0];
    const task = new vscode.Task({ type: 'vince', task: 'vince-test' }, workspaceFolder, 'vince-test', 'vince', new vscode.ShellExecution(`sleep 5; echo "Hello World - Test"`));
    task.group = vscode.TaskGroup.Test;
    task.presentationOptions.reveal = vscode.TaskRevealKind.Always;
    return task;
}

function getBuildTask(): vscode.Task {
    const workspaceFolder = vscode.workspace.workspaceFolders![0];
    const task = new vscode.Task({ type: 'vince', task: 'vince-build' }, workspaceFolder, 'vince-build', 'vince', new vscode.ShellExecution(`sleep 5; echo "Hello World - Build"`));
    task.group = vscode.TaskGroup.Build;
    task.presentationOptions.reveal = vscode.TaskRevealKind.Always;
    return task;
}

function getRebuildTask(): vscode.Task {
    const workspaceFolder = vscode.workspace.workspaceFolders![0];
    const task = new vscode.Task({ type: 'vince', task: 'vince-rebuild' }, workspaceFolder, 'vince-rebuild', 'vince', new vscode.ShellExecution(`sleep 5; echo "Hello World - Rebuild"`));
    task.group = vscode.TaskGroup.Rebuild;
    task.presentationOptions.reveal = vscode.TaskRevealKind.Always;
    return task;
}

function getCleanTask(): vscode.Task {
    const workspaceFolder = vscode.workspace.workspaceFolders![0];
    const task = new vscode.Task({ type: 'vince', task: 'vince-clean' }, workspaceFolder, 'vince-clean', 'vince', new vscode.ShellExecution(`sleep 5; echo "Hello World - Clean"`));
    task.group = vscode.TaskGroup.Clean;
    task.presentationOptions.reveal = vscode.TaskRevealKind.Always;
    return task;
}

function getNoneTask(): vscode.Task {
    const workspaceFolder = vscode.workspace.workspaceFolders![0];
    const task = new vscode.Task({ type: 'vince', task: 'vince-none' }, workspaceFolder, 'vince-none', 'vince', new vscode.ShellExecution(`sleep 5; echo "Hello World - None"`));
    task.presentationOptions.reveal = vscode.TaskRevealKind.Always;
    return task;
}
