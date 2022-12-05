import React, {FunctionComponent, useRef} from 'react';
import {Desk} from "../../components/Desk/Desk";
import './HomePage.scss';
import {CreateDesk} from "../../components/CreateDesk/CreateDesk";

export const HomePage: FunctionComponent = () => {

    const desks = useRef([{
        title: 'Desk 1'
    }, {
        title: 'Desk 1'
    }]);

    const deskComponents = desks.current.map(desk => <Desk title={desk.title}/>);

    return <div className='home-page'>
        <div className='desks'>
            {deskComponents}
            <CreateDesk/>
        </div>
    </div>;
}