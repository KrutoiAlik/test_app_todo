import React, {FormEvent, FunctionComponent, useState} from 'react';
import './DeskModal.scoped.scss';

type AddDeskModalProps = {
    close: () => void,
    submit: (e: FormEvent, name: string) => void
}

export const DeskModal: FunctionComponent<AddDeskModalProps> = (props) => {

    const [name, setName] = useState('');

    return (
        <>
            <div className="bg"></div>
            <div className='modal'>
                <div className='modal__content'>
                    <div className="modal__header">
                        <h1 className='title'>Create a new desk</h1>
                    </div>
                    <div className="modal__body">
                        <form className='form' onSubmit={(e) => props.submit(e, name)}>
                            <input id='name'
                                   type='text'
                                   value={name}
                                   placeholder='DeskCard name...'
                                   onChange={(e) => setName(e.target.value)}/>
                            <input className='form__submit' type="submit" value="Save"/>
                        </form>
                    </div>
                </div>
                <div className="close" onClick={props.close}>╳</div>
            </div>
        </>
    );
}