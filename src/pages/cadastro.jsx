import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../constants/loading";

export default function Cadastro(){

    const stringLiteral = ""

    const [cadastroEmail, setCadastroEmail] = useState(stringLiteral);
    const [cadastroPassword, setCadastroPassword] = useState(stringLiteral);
    const [cadastroNome, setCadastroNome] = useState(stringLiteral);
    const [cadastroFoto, setCadastroFoto] = useState(stringLiteral);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function performCadastro (event){
        event.preventDefault();

        const corpo = {
            email: cadastroEmail,
            name: cadastroNome,
            image: cadastroFoto,
            password: cadastroPassword
        };

        setLoading(true);

        const cadastro = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`, corpo);
        cadastro.then(
            () => {
                navigate("/");
            }
        )
        cadastro.catch(
            (resposta) => {
                setLoading(false);
                alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
            }
        )
    }

    return(
        <Encloser>
        <Main>
            <img src={logo} alt="TrackIt Logo"/>
                <form onSubmit={performCadastro}>
                    <input
                        placeholder=" email"
                        type="email"
                        value={cadastroEmail}
                        onChange={(event) => setCadastroEmail(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        placeholder=" senha"
                        type="password"
                        value={cadastroPassword}
                        onChange={(event) => setCadastroPassword(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        placeholder=" nome"
                        type="text"
                        value={cadastroNome}
                        onChange={(event) => setCadastroNome(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <input
                        placeholder=" foto"
                        type="url"
                        value={cadastroFoto}
                        onChange={(event) => setCadastroFoto(event.target.value)}
                        required
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? <Loading/> : "Cadastrar"}
                    </button>
                </form>
            <Link to="/">
                Já tem uma conta? Faça login!
            </Link>
        </Main> 
        </Encloser>
    )
}

const Encloser = styled.div`
    background-color: #ffffff;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`

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
    button{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
`