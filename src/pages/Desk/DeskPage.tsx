import React, {FormEvent, FunctionComponent, useRef, useState} from 'react';
import './DeskPage.scoped.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useParams} from "react-router-dom";
import {Desk, Task, updateTasks} from "../../store/slices/deskSlice";
import {TaskModal} from "../../components/TaskModal/TaskModal";
import {addTask, getNextId, updateTask} from "../../components/TaskModal/TaskModalHelper";
import {TaskElement} from "../../components/TaskElement/TaskElement";

export const DeskPage: FunctionComponent = () => {

    const selectedTask = useRef<Task>({
        id: '',
        title: '',
        status: ''
    });

    const {id} = useParams();
    const tasksByStatus = new Map<string, Task[]>();
    const [isModalVisible, showModal] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const desks = useAppSelector(state => state.desks.desks) || [];

    const desk: Desk | undefined = desks.find(desk => desk.id === id);
    if (!desk) {
        throw Error('Failed to select a desk from the store');
    }

    desk.tasks.forEach(task => {

        if (!tasksByStatus.has(task.status)) {
            tasksByStatus.set(task.status, new Array<Task>(0));
        }

        tasksByStatus.get(task.status)?.push(task);
    });

    const openTask = (task: Task) => {
        selectedTask.current = task;
        showModal(true);
    }

    const deleteTask = (e: React.MouseEvent, id: string): void => {
        e.stopPropagation();
        dispatch(updateTasks({...desk, tasks: desk.tasks.filter(task => task.id !== id)}));
    }

    const getTaskElements = (tasks: Task[]) => {
        return tasks.map(task => (<TaskElement key={task.id}
                                               id={task.id}
                                               title={task.title}
                                               onDelete={(e) => deleteTask(e, task.id)}
                                               click={() => openTask(task)}></TaskElement>));
    }

    const submit = (e: FormEvent, updatedTask: Task) => {
        e.preventDefault();

        if (!updatedTask.id) {
            dispatch(updateTasks({...desk, tasks: addTask(desk, getNextId(desks), updatedTask)}));
        } else {
            dispatch(updateTasks({...desk, tasks: updateTask(desk, updatedTask)}));
        }

        showModal(false);
    }

    return <div className='deskPage'>

        <div className='desk-header'>
            <h3>{desk?.title}</h3>
        </div>

        <div className='desk-columns'>

            <div className="desk-column">
                <h3>TO DO</h3>
                <div className='splitter'></div>
                {getTaskElements(tasksByStatus.get('todo') || [])}
                <div className='task__add'
                     onClick={() => openTask({id: '', title: '', status: 'todo'})}>
                    Add Task
                </div>
            </div>

            <div className="desk-column">
                <h3>In Progress</h3>
                <div className='splitter'></div>
                {getTaskElements(tasksByStatus.get('in_progress') || [])}
                <div className='task__add'
                     onClick={() => openTask({id: '', title: '', status: 'in_progress'})}>
                    Add Task
                </div>
            </div>

            <div className="desk-column">
                <h3>Done</h3>
                <div className='splitter'></div>
                {getTaskElements(tasksByStatus.get('completed') || [])}
                <div className='task__add'
                     onClick={() => openTask({id: '', title: '', status: 'completed'})}>
                    Add Task
                </div>
            </div>

        </div>

        {isModalVisible
            ? <TaskModal task={selectedTask.current}
                         close={() => showModal(false)}
                         submit={submit}/>
            : null
        }
    </div>
}