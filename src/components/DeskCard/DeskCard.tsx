import React, {FunctionComponent} from 'react';
import './DeskCard.scoped.scss';
import {useNavigate} from "react-router-dom";

type DeskProps = {
    id: string,
    title: string
}

export const DeskCard: FunctionComponent<DeskProps> = ({id, title}) => {

    const navigate = useNavigate();

    return (
        <div className='desk' onClick={(e) => navigate('/desk/' + id)}>
            <div className="desk__header">{title}</div>
        </div>
    );
}