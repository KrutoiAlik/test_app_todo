import React, {FunctionComponent} from 'react';
import trash_icon from '../../static/trash.png';
import './TaskElement.scoped.scss';
import {useDrag} from "react-dnd";

type TaskElementProps = {
    id: string,
    title: string,
    status: string,
    click: () => void,
    onDelete: (e: React.MouseEvent, id: string) => void
}
export const TaskElement: FunctionComponent<TaskElementProps> = (props) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'taskElement',
        item: {
            id: props.id,
            status: props.status
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    return <div ref={drag} key={props.id} className='task__card' onClick={props.click}>
        <span>{props.title}</span>
        <img src={trash_icon}
             width='25'
             height='25'
             onClick={(e) => props.onDelete(e, props.id)}
             alt='delete'/>
    </div>
}