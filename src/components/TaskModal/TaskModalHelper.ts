import {Desk, Task} from "../../store/slices/deskSlice";

function getNextId(desks: Desk[]): string {
    return 'task_' + desks.reduce((prev, desk) => prev + +desk.tasks?.length, 1);
}

function addTask(desk: Desk, id: string, updatedTask: Task): Task[] {
    return [...desk.tasks, {...updatedTask, id: id}];
}

function updateTask(desk: Desk, updatedTask: Task): Task[] {
    return desk.tasks.map(task => {
        if (task.id === updatedTask.id) {
            return {...task, ...updatedTask};
        }

        return task;
    });
}

export {
    getNextId,
    addTask,
    updateTask
}