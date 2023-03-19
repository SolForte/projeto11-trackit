import styled from "styled-components";
import logo from "../assets/logo.png";
import { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login(){

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();
    const UserContext = createContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function performLogin (event){
        event.preventDefault();
        setLoading(true);
        const corpo = { email: formPassword, password: formPassword};
        axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`, corpo)
        return ("")
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
                    />
                    <input
                        placeholder=" senha"
                        type="password"
                        value={formPassword}
                        onChange={(event) => setFormPassword(event.target.value)}
                        required
                    />
                    <button type="submit">
                        Entrar
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
