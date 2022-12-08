import React, {FunctionComponent} from 'react';
import trash_icon from '../../static/trash.png';
import './TaskElement.scoped.scss';

type TaskElementProps = {
    id: string,
    title: string,
    click: () => void,
    onDelete: (e: React.MouseEvent, id: string) => void
}
export const TaskElement: FunctionComponent<TaskElementProps> = (props) => {

    return <div key={props.id} className='task__card' onClick={props.click}>
        <span>{props.title}</span>
        <img src={trash_icon}
             width='25'
             height='25'
             onClick={(e) => props.onDelete(e, props.id)}
             alt='delete'/>
    </div>
}