import React, {FunctionComponent} from 'react';
import './CreateDesk.scss';

export const CreateDesk: FunctionComponent = () => {
    return (<div className='desk create-desk' onClick={() => console.log('Create a desk')}>
        <div className="create-desk__header">+</div>
    </div>);
}