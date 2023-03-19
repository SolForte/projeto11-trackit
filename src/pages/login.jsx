import styled from "styled-components";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../constants/loading";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Login(){

    const emailLiteral = "sol@gmail.com"
    const passwordLiteral = "123456"

    const [formEmail, setFormEmail] = useState(emailLiteral);
    const [formPassword, setFormPassword] = useState(passwordLiteral);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {setUserData} = useContext(UserContext);

    function performLogin (event){
        event.preventDefault();
        setLoading(true);
        const corpo = { email: formEmail, password: formPassword};
        const login = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, corpo);
        login.then(
            (resposta) => {
                setUserData(resposta.data);
                setLoading(false);
                navigate("/habitos")
            }
        )
        login.catch(
            (resposta) => {
                setLoading(false);
                alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
            }
        )
    }

    return(
        <Main>
            <img src={logo} alt="TrackIt Logo"/>
                <form onSubmit={performLogin}>
                    <input
                        placeholder=" email"
                        type="email"
                        value={formEmail}
                        onChange={(event) => setFormEmail(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        placeholder=" senha"
                        type="password"
                        value={formPassword}
                        onChange={(event) => setFormPassword(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? <Loading/> : "Cadastrar"}
                    </button>
                </form>
            <Link to="/cadastro">
                Não tem uma conta? Cadastre-se!
            </Link>
        </Main> 
    )
}

const Main = styled.div`
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 180px;
    }
    a{
        margin-top: 25px;
        text-decoration: none;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        text-align: center;
        text-decoration-line: underline;
        color: #52B6FF;
    }
`
