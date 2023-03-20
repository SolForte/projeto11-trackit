import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { UserProgress } from "../contexts/UserProgress";

export default function Diarias( {habito, habitsList, setHabitsList} ){

    const [current, setCurrent] = useState(habito)
    const {setUserProgress} = useContext(UserProgress);
    const {userData} = useContext(UserContext);

    useEffect(
        () => {

        if (current !== undefined){
            console.log("Build dailly")
        }
        }
    ,)
    

    function checagem(){
        if (current.done === false){
            console.log("Marcar")
            marcar();
        }
        else if (current.done === true){
            console.log("Desmarcar")
            desmarcar();
        }
    }

    function marcar(){
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${userData.token}`}
            }

            const check = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${current.id}/check`, body, config);
            check.then(
                (resposta) => {
                    console.log(resposta)
                }
            )
            check.catch(
                (resposta) => {
                    console.log(resposta)
                }
            )
    }

    function desmarcar(){
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${userData.token}`}
            }
            
            const uncheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${current.id}/uncheck`, body, config)
            uncheck.then(
                (resposta) => {
                    console.log(resposta)
                }
            )
            uncheck.catch(
                (resposta) => {
                    console.log(resposta)
                }
            )

    }

    function fetchHabits(){

        const config = {headers: {Authorization: `Bearer ${userData.token}`}};

        const habits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`, config);

        habits.then(
            (resposta) => {
                setHabitsList(resposta.data);
                console.log(resposta.data)
            }
        )
    }
 
    if (current !== undefined){
        return (
            <Caixa data-test="today-habit-container">
                <Titulo data-test="today-habit-name">{current.name}</Titulo>
                
                <SequenciaAtual data-test="today-habit-sequence">
                    Sequência atual: <Sequence atual={current.currentSequence} recorde={current.highestSequence}>{current.currentSequence} {current.currentSequence > 1 ? "dias" :  current.currentSequence !== 0 ? "dia" : ""}</Sequence>
                </SequenciaAtual>
                
                <Recorde data-test="today-habit-record">
                    Seu recorde: <Sequence atual={current.currentSequence} recorde={current.highestSequence}>{current.highestSequence} {current.highestSequence > 1 ? "dias" : current.highestSequence !== 0 ? "dia" : ""}</Sequence>
                </Recorde>

                <CheckmarkButton toggleStatus={current.done} onClick={()=>checagem()} data-test="today-habit-check-btn">
                    <ion-icon name="checkmark"></ion-icon>
                </CheckmarkButton>
            </Caixa>
        )
    }
}

const Sequence = styled.span`
    color: ${props => props.atual > 0 && props.atual === props.recorde ? "#8FC549" : "#666666" };
`

const Titulo = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin-top: 13px;
    margin-bottom: 7px;
`
const SequenciaAtual = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666
`

const Recorde = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 12.976px;
    line-height: 16px;
    color: #666666
`

const Caixa = styled.div`
    background: #FFFFFF;
    height: 94px;
    position: relative;
    border-radius: 5px;
    p{
        margin-left: 15px;
    }
`

const CheckmarkButton = styled.button`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    border: none;
    background-color: ${
        props => props.toggleStatus ? "#8FC549" : "#EBEBEB"
    };
    position: absolute;
    right: 13px;
    bottom: 12px;
    ion-icon{
        color: white;
        font-size: 35px;
        --ionicon-stroke-width: 80px;
    }
`