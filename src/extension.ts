import * as vscode from 'vscode';

interface TestTaskDefinition extends vscode.TaskDefinition {
    /**
     * The task name.
     */
    task: string;
}

export function activate(context: vscode.ExtensionContext) {
    console.log(' \'vscode-task-provider-example\' extension started...');

    let taskPromise: Thenable<vscode.Task[]> | undefined = undefined;
    const taskProvider = vscode.tasks.registerTaskProvider('vince', {
        provideTasks: () => {
            if (!taskPromise) {
                taskPromise = getTestTasks();
            }
            return taskPromise;
        },
        resolveTask(_task: vscode.Task): vscode.Task | undefined {
            const task = _task.definition.task;
            if (task) {
                const definition: TestTaskDefinition = <any>_task.definition;
                return new vscode.Task(
                    definition,
                    _task.scope ?? vscode.TaskScope.Workspace,
                    definition.task,
                    _task.name,
                    _task.execution,
                );
            }
            return undefined;
        }
    });
}

export function deactivate() { }

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
    const task = new vscode.Task({ type: 'vince', task: 'vince-test' }, 'vince-test', 'vince', new vscode.ShellExecution(`echo "Hello World - Test"`));
    task.group = vscode.TaskGroup.Test;
    return task;
}

function getBuildTask(): vscode.Task {
    const task = new vscode.Task({ type: 'vince', task: 'vince-test' }, 'vince-build', 'vince', new vscode.ShellExecution(`echo "Hello World - Build"`));
    task.group = vscode.TaskGroup.Build;
    return task;
}

function getRebuildTask(): vscode.Task {
    const task = new vscode.Task({ type: 'vince', task: 'vince-rebuild' }, 'vince-rebuild', 'vince', new vscode.ShellExecution(`echo "Hello World - Rebuild"`));
    task.group = vscode.TaskGroup.Rebuild;
    return task;
}

function getCleanTask(): vscode.Task {
    const task = new vscode.Task({ type: 'vince', task: 'vince-clean' }, 'vince-clean', 'vince', new vscode.ShellExecution(`echo "Hello World - Clean"`));
    task.group = vscode.TaskGroup.Clean;
    return task;
}

function getNoneTask(): vscode.Task {
    const task = new vscode.Task({ type: 'vince', task: 'vince-none' }, 'vince-none', 'vince', new vscode.ShellExecution(`echo "Hello World - None"`));
    return task;
}

