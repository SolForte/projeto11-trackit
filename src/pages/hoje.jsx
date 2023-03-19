import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { UserProgress } from "../contexts/UserProgress";
import axios from "axios";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Diarias from "../components/daillies";

export default function Hoje(){


    const {userData} = useContext(UserContext);
    const [habitsList, setHabitsList] = useState([]);
    const {userProgress} = useContext(UserProgress);
    const navigate = useNavigate();

    const DIAS_DA_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"]

    useEffect(()=>{
        fetchHabits()
    },[])

    const HOJE = `${DIAS_DA_SEMANA[dayjs().day()]}, ${dayjs().date()}/${dayjs().month()+1}`

    function fetchHabits(){

        const config = {headers: {Authorization: `Bearer ${userData.token}`}};

        const habits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);

        habits.then(
            (resposta) => {
                setHabitsList(resposta.data);
            }
        )
        habits.catch(
            (resposta) => {
                //alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
                navigate("/")
            }
        )
    }





    return(
    <Main>
        <Header/>
        <Container>
            <p data-test="today">
                {HOJE}
            </p>

            <p>
                {userProgress !== 0
                ? `${userProgress}% dos hábitos concluídos` 
                : `Nenhum hábito concluído ainda`
                }
            </p>

            <Diarias habitsList={habitsList} setHabitsList={setHabitsList}/>

        </Container>
        <Footer/>
    </Main>)
}

const Container = styled.div`
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #E5E5E5;
    width: 100vw;
    height: 100vh;
    margin-top: 70px;
    padding-top: 22px;
`