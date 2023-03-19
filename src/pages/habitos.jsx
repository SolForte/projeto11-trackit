import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Habitos(){

    const {userData} = useContext(UserContext);
    const navigate = useNavigate();

    const [habitsList, setHabitsList] = useState([])

    useEffect(()=>{
        
        console.log(userData);
        const config = {headers: {Authorization: `Bearer ${userData.token}`}};

        const habits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);
        habits.then(
            (resposta) => {
                setHabitsList(resposta.data)
            }
        )
        habits.catch(
            (resposta) => {
                alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
                navigate("/")
            }
        )
    },[])

    return(
        <Main>
            <Header/>
            <Footer/>
        </Main>
    )
}

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E5E5E5;
    width: 100vw;
    height: 100vh;
`