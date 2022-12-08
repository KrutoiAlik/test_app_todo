import React, {FormEvent, FunctionComponent, useState} from 'react';
import {DeskCard} from "../../components/DeskCard/DeskCard";
import './HomePage.scss';
import {CreateDesk} from "../../components/CreateDeskCard/CreateDesk";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {DeskModal} from "../../components/DeskModal/DeskModal";
import {addDesk} from "../../store/slices/deskSlice";

export const HomePage: FunctionComponent = () => {

    const [isModalVisible, showModal] = useState(false);

    const dispatch = useAppDispatch();

    const desks = useAppSelector(state => state.desks.desks);

    const deskComponents = desks.map(desk => <DeskCard key={desk.id} id={desk.id} title={desk.title}/>);
    const closeModal = (): void => showModal(false);
    const submit = (e: FormEvent, name: string): void => {
        e.preventDefault();
        dispatch(addDesk(name));
        closeModal();
    }

    return <div className='home-page'>
        {isModalVisible ? <DeskModal close={closeModal} submit={submit}/> : null}
        <div className='desks'>
            {deskComponents}
            <CreateDesk onClick={() => showModal(true)}/>
        </div>
    </div>;
}