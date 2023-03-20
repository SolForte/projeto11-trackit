import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { UserProgress } from "../contexts/UserProgress";


export default function Diarias({habitsList, setHabitsList, refresh, setRefresh}){

    const {setUserProgress} = useContext(UserProgress);
    const {userData} = useContext(UserContext);
    const [marcado, setMarcado] = useState(false)

    const HabitsListexemplo = [
        {id: 57256, name: '2nd', done: true, currentSequence: 1, highestSequence: 1},
        {id: 57257, name: '3rd', done: false, currentSequence: 0, highestSequence: 0}
    ]

    useEffect(
        ()=>{
            {
            calculoProgresso(habitsList)
            console.log("Calculo progresso...")
            }
        }
    )

    function calculoProgresso(habitsList){
        const porcento = 100;
        const completos = (habitsList.filter((elemento)=>(elemento.done === true)).length);
        setUserProgress(Math.floor((completos/habitsList.length)*porcento));
    }

    function checagem(habito){
        if (habito.done === false){
            marcar(habito);
        }
        else if (habito.done === true){
            desmarcar(habito);
        }
    }

    function marcar(habito){
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${userData.token}`}
            }

            console.log("Marcado!")

            const check = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, body, config);
            check.then(
                (resposta) => {
                    console.log(resposta)
                    setRefresh(!refresh)
                    console.log("Marcar")
                    calculoProgresso(habitsList)
                }
            )
            check.catch(
                (resposta) => {
                    console.log(resposta)
                }
            )
    }


    function desmarcar(habito){
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${userData.token}`}
            }

            console.log("Desmarcado!")
        
            const uncheck = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, body, config)
            uncheck.then(
                (resposta) => {
                    console.log(resposta)
                    setRefresh(!refresh)
                    console.log("Desmarcar")
                    calculoProgresso(habitsList)
                }
            )
            uncheck.catch(
                (resposta) => {
                    console.log(resposta)
                }
            )
    }

    return(
        
        habitsList.map(
            (habito, index) => {
                
                return (
                    <Caixa data-test="today-habit-container" key={index}>
                    <Titulo data-test="today-habit-name">{habito.name}</Titulo>
                    
                    <SequenciaAtual data-test="today-habit-sequence">
                        Sequência atual: <Sequence marcou={habito.done}>
                            {habito.currentSequence} {habito.currentSequence > 1 ? "dias" :  habito.currentSequence !== 0 ? "dia" : ""}
                        </Sequence>
                    </SequenciaAtual>
                    
                    <Recorde data-test="today-habit-record">
                        Seu recorde: <RecordSequence atual={habito.currentSequence} recorde={habito.highestSequence}>
                            {habito.highestSequence} {habito.highestSequence > 1 ? "dias" : habito.highestSequence !== 0 ? "dia" : ""}
                        </RecordSequence>
                    </Recorde>
    
                    <CheckmarkButton marcado={habito.done} data-test="today-habit-check-btn" onClick={()=>checagem(habito)}>
                        <ion-icon name="checkmark"></ion-icon>
                    </CheckmarkButton>
                    </Caixa>
                )
            }
        )

    )
}

const Sequence = styled.span`
    color: ${props => props.marcou === true ? "#8FC549" : "#666666" };
`
const RecordSequence = styled.span`
    color: ${props => props.atual > 0 && props.atual >= props.recorde ? "#8FC549" : "#666666" };
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
        props => props.marcado ? "#8FC549" : "#EBEBEB"
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