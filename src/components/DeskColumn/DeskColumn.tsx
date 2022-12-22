import React, {FunctionComponent} from 'react';
import {useDrop} from "react-dnd";
import {Task} from "../../types/Task";

type DeskColumnProps = {
    header: string,
    status: string,
    tasks: JSX.Element[],
    click: () => void,
    handleDrop: (item: any) => void
}
export const DeskColumn: FunctionComponent<DeskColumnProps> = (props) => {

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'taskElement',
        drop: (item: Task) => {
            console.log({id: item.id});
            props.handleDrop({...item, status: props.status});
        },
        canDrop: (item: Task) => {
            return props.status === 'in_progress'
                || item.status === 'in_progress'
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    return (
        <div ref={drop} className="desk-column">
            <h3>{props.header}</h3>
            <div className='splitter'></div>
            {props.tasks}
            <div className='task__add' onClick={props.click}>
                Add Task
            </div>
        </div>);
}