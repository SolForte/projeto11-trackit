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
            if (habitsList !== undefined && habitsList !== null){
            calculoProgresso(habitsList)
            console.log("useEffect")
            }
        }
    )

    function calculoProgresso(habitsList){
        const porcento = 100;
        const completos = (habitsList.filter((elemento)=>(elemento.done === true)).length);
        setUserProgress(Math.floor((completos/habitsList.length)*porcento));
    }

    return(
        
        habitsList.map(
            (habito, index) => {

                console.log(habito)

                return (
                    <Caixa data-test="today-habit-container">
                    <Titulo data-test="today-habit-name">{habito.name}</Titulo>
                    
                    <SequenciaAtual data-test="today-habit-sequence">
                        Sequência atual: <Sequence atual={habito.currentSequence} recorde={habito.highestSequence}>
                            {habito.currentSequence} {habito.currentSequence > 1 ? "dias" :  habito.currentSequence !== 0 ? "dia" : ""}
                        </Sequence>
                    </SequenciaAtual>
                    
                    <Recorde data-test="today-habit-record">
                        Seu recorde: <Sequence atual={habito.currentSequence} recorde={habito.highestSequence}>
                            {habito.highestSequence} {habito.highestSequence > 1 ? "dias" : habito.highestSequence !== 0 ? "dia" : ""}
                        </Sequence>
                    </Recorde>
    
                    <CheckmarkButton marcado={habito.done} data-test="today-habit-check-btn">
                        <ion-icon name="checkmark"></ion-icon>
                    </CheckmarkButton>
                    </Caixa>
                )
            }
        )

    )
}
/* 
export function Teste( {habito, habitsList, setHabitsList, refresh, setRefresh} ){

    const [current, setCurrent] = useState(habito)

    useEffect(
        () => {
            console.log(current)
            setAtual(current.currentSequence)
            setRecorde(current.highestSequence)
            setMarcado(current.done)
            calculoProgresso(habitsList)
        }
    )

    function calculoProgresso(habitsList){
        const porcento = 100;
        const completos = (habitsList.filter((elemento)=>(elemento.done === true)).length);
        setUserProgress(Math.floor((completos/habitsList.length)*porcento));
        console.log("calculo progresso")
    }
    

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
                    setMarcado(!marcado)
                    setRefresh(refresh++)
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
                    setMarcado(!marcado)
                    setRefresh(refresh++)
                }
            )
            uncheck.catch(
                (resposta) => {
                    console.log(resposta)
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

                <CheckmarkButton marcado={habito.done} onClick={()=>checagem()} data-test="today-habit-check-btn">
                    <ion-icon name="checkmark"></ion-icon>
                </CheckmarkButton>
            </Caixa>
        )
    }
}
*/

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