import React, { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const [login, setLogin] = useState('')
    const [pwd, setPwd] = useState('')

    async function submit(e: { preventDefault: () => void; }) {
        const history = useNavigate();

        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/signup", {
                login, pwd
            }).then(res => {
                if (res.data = "Email exists.") {
                    console.log("User has not signed up.")
                } else if (res.data = "Email does not exist.") {
                    history("/home", { state: { id: login } })
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
            Inscrivez-vous
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
        <Link to="/">Connectez-vous</Link>
    </div>)
}

export default Login