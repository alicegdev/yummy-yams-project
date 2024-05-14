import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
    const history = useNavigate();
    const [login, setLogin] = useState('')
    const [pwd, setPwd] = useState('')

    async function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        console.log(login);
        console.log(pwd);
        try {
            await axios.post("http://localhost:3001/", {
                login, pwd
            })
                .then(res => {
                    console.log(login)
                    if (res.data === "User logged in.") {
                        history("/home", { state: { id: login } })
                    } else if (res.data === "Wrong details.") {
                        console.log("User has not signed up.")
                    }
                })
                .catch(e => {
                    console.log("Wrong details" + e)
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