import React, {FunctionComponent} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import {Home} from "./pages/Home";
import {Desk} from "./pages/Desk";

export const App: FunctionComponent = () => {

    return (
        <div className='App'>
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/desk/:id">Log in</Link>
                    </li>
                </ul>
            </nav>

            <div className='routes'>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/desk/:id' element={<Desk/>}/>
                </Routes>
            </div>
        </div>
    )
}