import '../index.css'; // chemin vers votre fichier CSS
import { rollerHandler } from "../../../api/utils/diceRoller"
import { UserContext, UserContextType } from '../App';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const { login, setLogin } = useContext<UserContextType>(UserContext);
    const [errorMessage, setErrorMessage] = useState('');
    const [messageToUser, setMessageToUser] = useState('');
    const [dices, setDices] = useState<number[]>([]); // Ajout de l'état pour stocker les dés
    axios.defaults.headers.common['x-access-token'] = login;

    const rollDice = async (): Promise<void> => {
        try {
            await axios.post("http://localhost:3001/diceRoll")
                .then(res => {

                })
                .catch(e => {
                    setErrorMessage("Erreur lors du lancer de dés" + e);
                })
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="homepage">
            <h1>Bonjour et bienvenue sur YummyYams</h1>
            <div id='roll' className='roll-button' onClick={rollDice}><button>Jouez !</button></div>
            <div className="game flex">
                {dices}
                {messageToUser}
            </div>
        </div>
    )
}

export default Home