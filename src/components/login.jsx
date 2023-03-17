import styled from "styled-components";
import logo from "../assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login(){

    const [formEmail, setFormEmail] = useState();
    const [formPassword, setFormPassword] = useState();

    function performLogin (){
        return ("")
    }

    return(
        <Main>
            <img src={logo} alt="TrackIt Logo"/>
            <FormContainer>
                <form onSubmit={performLogin}>
                    <input
                        placeholder="email"
                        type="email"
                        value={formEmail}
                        onChange={(event) => setFormEmail(event.target.value)}
                        required
                    />
                    <input
                        placeholder="senha"
                        type="password"
                        value={formPassword}
                        onChange={(event) => setFormPassword(event.target.value)}
                        required
                    />
                    <button data-test="book-seat-btn" type="submit">
                        Entrar
                    </button>
                </form>
            </FormContainer>
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
        text-decoration: none;
    }
`

const FormContainer = styled.div``

