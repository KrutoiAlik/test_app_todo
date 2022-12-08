import React, {ChangeEvent, FormEvent, FunctionComponent, useState} from 'react';
import {Task} from "../../store/slices/deskSlice";
import './TaskModal.scoped.scss';

type AddTaskModalProps = {
    task: Task,
    close: () => void,
    submit: (e: FormEvent, task: Task) => void
}
export const TaskModal: FunctionComponent<AddTaskModalProps> = (props) => {

    const [task, setTask] = useState<Task>({
        id: props.task?.id || '',
        title: props.task?.title || '',
        status: props.task.status
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setTask(prevState => ({...prevState, [fieldName]: e.target.value}))
    }

    const header = task.id ? 'Edit a task' : 'Create a new task';

    return (
        <>
            <div className="bg"></div>
            <div className='modal'>
                <div className='modal__content'>
                    <div className="modal__header">
                        <h1 className='title'>{header}</h1>
                    </div>
                    <div className="modal__body">
                        <form className='form' onSubmit={(e) => props.submit(e, task)}>
                            <fieldset>
                                <input id='name'
                                       type='text'
                                       value={task.title}
                                       onChange={(e) => handleChange(e, 'title')}
                                       placeholder='Title...'/>
                            </fieldset>
                            <input className='form__submit' type="submit" value="Save"/>
                        </form>
                    </div>
                </div>
                <div className="close" onClick={props.close}>╳</div>
            </div>
        </>
    );
}