import React, {FormEvent, FunctionComponent, useState} from 'react';
import {DeskCard} from "../../components/DeskCard/DeskCard";
import './HomePage.scss';
import {CreateDesk} from "../../components/CreateDeskCard/CreateDesk";
import {useAppDispatch} from "../../store/hooks";
import {DeskModal} from "../../components/DeskModal/DeskModal";
import store, {RootState} from "../../store";
import {addDesk, deskAdapter} from "../../store/slices/deskSlice";

export const HomePage: FunctionComponent = () => {

    const [isModalVisible, showModal] = useState(false);

    const dispatch = useAppDispatch();

    const deskSelectors = deskAdapter.getSelectors<RootState>(state => state.desks);
    const desks = deskSelectors.selectAll(store.getState());

    const deskComponents = desks.map(desk => <DeskCard key={desk.id} id={desk.id} title={desk.title}/>);
    const closeModal = (): void => showModal(false);
    const submit = (e: FormEvent, name: string): void => {
        e.preventDefault();
        dispatch(addDesk({id: `deskId_${desks.length + 1}`, title: name, taskIds: []}));
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