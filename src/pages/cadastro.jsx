import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cadastro(){

    const [cadastroEmail, setCadastroEmail] = useState();
    const [cadastroPassword, setCadastroPassword] = useState();
    const [cadastroNome, setCadastroNome] = useState();
    const [cadastroFoto, setCadastroFoto] = useState();

    function performCadastro (){
        return ("")
    }

    return(
        <Main>
            <img src={logo} alt="TrackIt Logo"/>
                <form onSubmit={performCadastro}>
                    <input
                        placeholder=" email"
                        type="email"
                        value={cadastroEmail}
                        onChange={(event) => setCadastroEmail(event.target.value)}
                        required
                    />
                    <input
                        placeholder=" senha"
                        type="password"
                        value={cadastroPassword}
                        onChange={(event) => setCadastroPassword(event.target.value)}
                        required
                    />
                    <input
                        placeholder=" nome"
                        type="text"
                        value={cadastroNome}
                        onChange={(event) => setCadastroNome(event.target.value)}
                        required
                    />
                    <input
                        placeholder=" foto"
                        type="url"
                        value={cadastroFoto}
                        onChange={(event) => setCadastroFoto(event.target.value)}
                        required
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            <Link to="/">
                Já tem uma conta? Faça login!
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