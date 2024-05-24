import { useContext, useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext, UserContextType } from '../App';

function Login() {
    const { login, setLogin } = useContext<UserContextType>(UserContext);
    const [pwd, setPwd] = useState('')
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    async function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/", {
                login, pwd
            })
                .then(res => {
                    if (res.data.accessToken) {
                        console.log(res.data.accessToken)
                        setLogin(login);
                        localStorage.setItem('token', res.data.accessToken);
                        navigate('/home');
                    } else if (res.data === "Wrong details.") {
                        setErrorMessage("Erreur d'authentification");
                    }
                })
                .catch(e => {
                    setErrorMessage("Erreur d'authentification" + e);
                })
        } catch (e) {
            console.log(e)
        }
    }
    return (<div className="login">
        <h1>
            Connectez-vous
        </h1>
        <form action="POST">
            <input type="email" onChange={(e) => { setLogin(e.target.value) }} placeholder="Entrez votre email"></input>
            <input type="password" onChange={(e) => { setPwd(e.target.value) }} placeholder="Entre un mot de passe"></input>
            {errorMessage && <div>{errorMessage}</div>}
            <input type="submit" onClick={submit}>
            </input>
        </form>
        <br />
        <p>
            OU
        </p>
        <Link to="/signup">Inscrivez-vous</Link>
    </div>)
}

export default Login