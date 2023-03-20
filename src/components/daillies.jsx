import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { UserProgress } from "../contexts/UserProgress";

export default function Diarias( {habito, habitsList, setHabitsList} ){

    const [current, setCurrent] = useState(habito)
    const [toggleStatus,setToggleStatus] = useState(false);
    const {setUserProgress} = useContext(UserProgress);
    const {userData} = useContext(UserContext);

    useEffect(
        () => {

        if (current !== undefined){
            setToggleStatus(current.done)
            checagem();
        }
        }
    )
    
    function checagem(){
        const porcento = 100;
        const completos = (habitsList.filter((elemento)=>(elemento.done === true)).length);
        setUserProgress(Math.floor((completos/habitsList.length)*porcento))
    }


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
            }
        )
    }

/*     function checkHabito(){

        setHabAtual([...habAtual,hab.id]);
        setActiveDisabled(true);

        if (hab.done === false){

            const token = loginOk.token;
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }

            axios
                .post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit//habits/${hab.id}/check`, body, config)
                .then (res => {
                    console.log(res.data);
                    setActiveDisabled(false);
                    setHabAtual([]);
                    setRodar(rodar + 1);
                })
                .catch(err => {
                    alert(err.response.data.message)
                    setActiveDisabled(false);
                })

        } else if (hab.done === true) {

            const token = loginOk.token;
            const body = {};
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }

            axios
                .post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit//habits/${hab.id}/uncheck`, body, config)
                .then (res => {
                    console.log(res.data);
                    setTimeout(setActiveDisabled(false), 5000);
                    setHabAtual([]);
                    setRodar(rodar + 1);
                })
                .catch(err => {
                    alert(err.response.data.message);
                    setActiveDisabled(false);
                })
        }
    } */

/*     function tratamentoDeDados(event){
        setToggleStatus(true);
        setCurrent([...current, habito.id]);
        if (habito.done !== true){
            const body = {}
            const config = {headers: {Authorization: `Bearer ${userData.token}`}};
            const marcar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, body, config);
            marcar.then(
                (resposta) => {
                    console.log(resposta)
                    fetchHabits()
                    setToggleStatus(false);
                    setCurrent([]);
                }
            )
            marcar.catch(
                (resposta) => {
                    fetchHabits()
                    setToggleStatus(false);
                }
            )
        } else {
            const body = {}
            const config = {headers: {Authorization: `Bearer ${userData.token}`}};
            const marcar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, body, config);
            marcar.then(
                (resposta) => {
                    setHabitsList(resposta.data);
                    setToggleStatus(false);
                    setCurrent([]);
                })
            marcar.catch(
                (resposta) => {
                    setToggleStatus(false);
                }
                )
        }
    } */
 
    if (current !== undefined){
        return (
            <Caixa>
                <Titulo>{current.name}</Titulo>
                
                <SequenciaAtual>
                    Sequência atual: <span>{current.currentSequence} {current.currentSequence > 1 ? "dias" :  current.currentSequence !== 0 ? "dia" : ""}</span>
                </SequenciaAtual>
                
                <Recorde>
                    Seu recorde: <span>{current.highestSequence} {current.highestSequence > 1 ? "dias" : current.highestSequence !== 0 ? "dia" : ""}</span>
                </Recorde>

                <CheckmarkButton toggleStatus={toggleStatus}>
                    <ion-icon name="checkmark"></ion-icon>
                </CheckmarkButton>
            </Caixa>
        )
    }
}

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