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
    const {userProgress} = useContext(UserProgress);
    const {setUserProgress} = useContext(UserProgress);

    const [habitsList, setHabitsList] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const navigate = useNavigate();

    const DIAS_DA_SEMANA = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
    const HOJE = `${DIAS_DA_SEMANA[dayjs().day()]}, ${dayjs().date()}/${dayjs().month()+1}`

    useEffect(()=>{
        fetchHabits()
    },[refresh])

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
                alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
                navigate("/")
            }
        )
    }

    return(
    <Main>
        <Header/>
        <Container>
            <TopMenu>
                <p data-test="today">
                    {DIAS_DA_SEMANA[dayjs().day()]}, {dayjs().format("DD/MM")}
                </p>
            </TopMenu>

            <PorcentagemConcluida data-test="today-counter" cor={userProgress !== 0 && !isNaN(userProgress)}>
                {userProgress !== 0 && userProgress !== undefined && userProgress !== null && !isNaN(userProgress)
                ? `${userProgress}% dos hábitos concluídos` 
                : `Nenhum hábito concluído ainda`
                }
            </PorcentagemConcluida>
            
            <DaillyGap>
                        <Diarias
                            habitsList={habitsList}
                            setHabitsList={setHabitsList}
                            refresh={refresh}
                            setRefresh={setRefresh}
                        > 
                        </Diarias>
            </DaillyGap>
        </Container>
        <Footer/>
    </Main>)
}

const DaillyGap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
`

const Container = styled.div`
    padding-top: 92px;
    width: 340px;
`

const PorcentagemConcluida = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${props => props.cor ? "#8FC549": "#BABABA"};
`

const Main = styled.div`
    width: 100vw;
    margin-bottom: 178px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const TopMenu = styled.div`
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }    
`