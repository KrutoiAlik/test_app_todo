import React, {FormEvent, FunctionComponent, useRef, useState} from 'react';
import './DeskPage.scoped.scss';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useParams} from "react-router-dom";
import {TaskModal} from "../../components/TaskModal/TaskModal";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Task} from "../../types/Task";
import {deskAdapter, updateDesk} from "../../store/slices/deskSlice";
import store, {RootState} from "../../store";
import {Desk} from "../../types/Desk";
import {EntityId} from "@reduxjs/toolkit";
import {addTask, removeTask, taskAdapter, updateTask} from "../../store/slices/taskSlice";
import {createDeskColumns, generateNextId, getTasksByStatus} from "./DeskPageHelper";

const taskSelectors = taskAdapter.getSelectors<RootState>(state => state.tasks)

export const DeskPage: FunctionComponent = () => {

    // For refresh the page
    useAppSelector(state => state.tasks)
    const dispatch = useAppDispatch();

    const {id} = useParams();
    const deskId = id;

    const NEW_TASK: Task = {
        id: '',
        deskId: deskId as string,
        title: '',
        status: '',
        description: ''
    }

    const selectedTask = useRef<Task>(NEW_TASK);

    const [isModalVisible, showModal] = useState<boolean>(false);

    const deskSelectors = deskAdapter.getSelectors<RootState>(state => state.desks);

    const desk: Desk | undefined = deskSelectors.selectById(store.getState(), deskId as EntityId);
    if (!desk) {
        throw Error('Failed to select a desk from the store');
    }

    const tasks: Task[] = taskSelectors.selectAll(store.getState())
        .filter(task => task && desk.taskIds.includes(task.id));

    const tasksByStatus = getTasksByStatus(tasks);
    const nextTaskId = generateNextId();

    const openTask = (task: Task) => {
        selectedTask.current = task;
        showModal(true);
    }

    const deleteTask = (e: React.MouseEvent, deletedTaskId: string): void => {
        e.stopPropagation();
        dispatch(updateDesk({
            id: deskId as string,
            changes: {
                taskIds: desk.taskIds.filter(taskId => taskId !== deletedTaskId)
            }
        }));
        dispatch(removeTask(deletedTaskId));
    }

    const submit = (e: FormEvent, updatedTask: Task) => {

        e.preventDefault();

        if (!updatedTask.id) {
            dispatch(addTask({...updatedTask, id: nextTaskId}));
            dispatch(updateDesk({
                id: deskId as string,
                changes: {
                    taskIds: [...desk.taskIds, nextTaskId]
                }
            }))
        } else {
            dispatch(updateTask({
                id: updatedTask.id, changes: {
                    ...updatedTask
                }
            }));
        }

        showModal(false);
    }

    const handleDrop = (task: Task) => {
        dispatch(updateTask({
            id: task.id, changes: {
                ...task
            }
        }));
    }

    return <DndProvider backend={HTML5Backend}>
        <div className='deskPage'>

            <div className='desk-header'>
                <h3>{desk?.title}</h3>
            </div>

            <div className='desk-columns'>
                {createDeskColumns(tasksByStatus, NEW_TASK, openTask, deleteTask, handleDrop)}
            </div>

            {isModalVisible
                ? <TaskModal task={selectedTask.current}
                             close={() => showModal(false)}
                             submit={submit}/>
                : null
            }
        </div>
    </DndProvider>
}