import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import React, { useState } from 'react'

export interface UserContextType {
    login: string;
    setLogin: (login: string) => void;
}

export const UserContext = React.createContext<UserContextType>({
    login: '',
    setLogin: () => { }
});

function App() {
    const [login, setLogin] = useState<string>('');

    return (
        <div className="App">
            <Router>
                <UserContext.Provider value={{ login: login, setLogin: setLogin }}>
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/home" element={<Home />}></Route>
                    </Routes>
                </UserContext.Provider>
            </Router>
        </div >
    )
}

export default App;
