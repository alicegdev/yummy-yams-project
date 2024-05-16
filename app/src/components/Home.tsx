import '../index.css';
import { UserContext, UserContextType } from '../App';
import { useContext, useState } from 'react';
import axios from 'axios';

function Home() {
    const { login, setLogin } = useContext<UserContextType>(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [messageToUser, setMessageToUser] = useState('');
    const [dices, setDices] = useState<number[]>([]);
    const token = localStorage.getItem('token');

    const rollDice = async (): Promise<void> => {
        try {
            const response = await axios.post("http://localhost:3001/diceRoll", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                login
            });
            if (response.data.message) setMessageToUser(response.data.message);
            if (response.data.dices) setDices(response.data.dices);
        } catch (error) {
            setErrorMessage("Erreur lors du lancer de dés: " + error);
        }
    };

    return (
        <div className="homepage">
            <h1>Bonjour et bienvenue sur YummyYams</h1>
            <div id='roll' className='roll-button' onClick={rollDice}><button>Jouez !</button></div>
            <div className="game flex">
                {dices}
                {messageToUser}
                {errorMessage && <div>{errorMessage}</div>}
            </div>
        </div>
    )
}

export default Home