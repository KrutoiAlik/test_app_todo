import React, {FunctionComponent} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/Home/HomePage";
import {DeskPage} from "./pages/Desk/DeskPage";
import './App.scss';
import notepad from './static/notepad.png';

export const App: FunctionComponent = () => {

    return (
        <div className='App'>
            <nav className="nav">
                <div className='logo__container'>
                    <img src={notepad} width='30' height='30' alt='logo'/>
                    <h3>Exile, do something!</h3>
                </div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>

            <div className='routes'>

                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/desk/:id' element={<DeskPage/>}/>
                </Routes>
            </div>
        </div>
    )
}