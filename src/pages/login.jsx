import styled from "styled-components";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../constants/loading";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const emailLiteral = "";
  const passwordLiteral = "";

  const [formEmail, setFormEmail] = useState(emailLiteral);
  const [formPassword, setFormPassword] = useState(passwordLiteral);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUserData } = useContext(UserContext);

  function performLogin(event) {
    event.preventDefault();
    setLoading(true);
    const corpo = { email: formEmail, password: formPassword };
    const login = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`,
      corpo
    );
    login.then((resposta) => {
      setUserData(resposta.data);
      setLoading(false);
      navigate("/hoje");
    });
    login.catch((resposta) => {
      setLoading(false);
      alert(
        `Erro ${resposta.response.status} - ${resposta.response.data.message}`
      );
    });
  }

  return (
    <Encloser>
      <Main>
        <img src={logo} alt="TrackIt Logo" />
        <form onSubmit={performLogin}>
          <input
            data-test="email-input"
            placeholder=" email"
            type="email"
            value={formEmail}
            onChange={(event) => setFormEmail(event.target.value)}
            required
            disabled={loading}
          />
          <input
            data-test="password-input"
            placeholder=" senha"
            type="password"
            value={formPassword}
            onChange={(event) => setFormPassword(event.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading} data-test="login-btn">
            {loading ? <Loading /> : "Entrar"}
          </button>
        </form>
        <Link to="/cadastro" data-test="signup-link">
          Não tem uma conta? Cadastre-se!
        </Link>
      </Main>
    </Encloser>
  );
}

const Encloser = styled.div`
    background-color: #ffffff;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

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
`;