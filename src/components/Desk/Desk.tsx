import React, {FunctionComponent} from 'react';
import './Desk.scss';

type DeskProps = {
    title: string
}

export const Desk: FunctionComponent<DeskProps> = ({title}: DeskProps) => {
    return (<div className='desk'>
        <div className="desk__header">{title}</div>
        <div className="desk__body"></div>
    </div>);
}