import { useState } from "react"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [login, setLogin] = useState('')
    const [pwd, setPwd] = useState('')
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const navigate = useNavigate();

    async function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/signup", {
                login, pwd
            }).then(res => {
                res.data === "User already exists." && setErrorMessage("User already exists")
                if (res.data === "User created") {
                    setSuccessMessage("Vous êtes inscrit(e)");
                    navigate('/');
                }
            })
                .catch(e => {
                    setErrorMessage("Erreur pendant l'inscription" + e)
                })
        } catch (e) {
            console.log(e)
        }
    }
    return (<div className="login">
        <h1>
            Inscrivez-vous
        </h1>
        <form action="POST">
            <input type="email" onChange={(e) => { setLogin(e.target.value) }} placeholder="Entrez votre email"></input>
            <input type="password" onChange={(e) => { setPwd(e.target.value) }} placeholder="Entre un mot de passe"></input>
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}
            <input type="submit" onClick={submit}>
            </input>
        </form>
        <br />
        <p>
            OU
        </p>
        <Link to="/">Connectez-vous</Link>
    </div>)
}

export default Login