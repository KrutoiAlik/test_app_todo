import {Task} from "../../types/Task";
import {TaskElement} from "../../components/TaskElement/TaskElement";
import React from "react";
import {taskAdapter} from "../../store/slices/taskSlice";
import store, {RootState} from "../../store";
import {DeskColumn} from "../../components/DeskColumn/DeskColumn";

const TODO_STATUSES = [{
    label: 'To Do',
    value: 'todo'
}, {
    label: 'In Progress',
    value: 'in_progress'
}, {
    label: 'Done',
    value: 'done'
}];

const taskSelectors = taskAdapter.getSelectors<RootState>(state => state.tasks)

const generateNextId = (): string => {
    const number = taskSelectors
        .selectAll(store.getState())
        .reduce((maxId, todo) => {
            return Math.max(+todo.id.split('_')[1], maxId)
        }, -1);

    return `taskId_${number + 1}`;
}

const getTasksByStatus = (tasks: Task[]): Map<string, Task[]> => {
    const tasksByStatus = new Map<string, Task[]>();
    tasks.forEach(task => {

        if (!tasksByStatus.has(task.status)) {
            tasksByStatus.set(task.status, new Array<Task>(0));
        }

        tasksByStatus.get(task.status)?.push(task);
    });

    return tasksByStatus;
}

const getTaskElements = (tasks: Task[],
                         deleteTask: (e: React.MouseEvent, id: string) => void,
                         openTask: (task: Task) => void): JSX.Element[] => {

    return tasks.map(task => (<TaskElement key={task.id}
                                           id={task.id}
                                           title={task.title}
                                           status={task.status}
                                           onDelete={(e) => deleteTask(e, task.id)}
                                           click={() => openTask(task)}></TaskElement>
    ));
}

const createDeskColumns = (tasksByStatus: Map<string, Task[]>,
                           initTask: Task,
                           openTask: (task: Task) => void,
                           deleteTask: (e: React.MouseEvent, id: string) => void,
                           handleDrop: (task: Task) => void): JSX.Element[] => {

    return TODO_STATUSES.map((status, index) => (
        <DeskColumn key={`column_${index}`} header={status.label}
                    status={status.value}
                    tasks={getTaskElements(tasksByStatus.get(status.value) || [], deleteTask, openTask)}
                    handleDrop={handleDrop}
                    click={() => openTask({
                        ...initTask,
                        status: status.value
                    })}/>
    ));
}

export {
    createDeskColumns,
    generateNextId,
    getTaskElements,
    getTasksByStatus
}