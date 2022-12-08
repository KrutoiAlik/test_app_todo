import React, {FunctionComponent} from 'react';
import './CreateDeskCard.scoped.scss';

type CreateDeskProps = {
    onClick: () => void
}

export const CreateDesk: FunctionComponent<CreateDeskProps> = (props) => {

    return (<div className='desk create-desk' onClick={props.onClick}>
        <div className="create-desk__header">+</div>
    </div>);
}