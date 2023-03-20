import { useEffect, useState } from "react";
import styled from "styled-components";

export default function WeekdayButtons(props){
    const {dia, index, status, diasSelecionados, setDiasSelecionados, loading} = props;
    const [statusBotao, setStatusBotao] = useState(status);

    useEffect(
        ()=>{
            if (diasSelecionados.includes(index)){
                setStatusBotao(!statusBotao);
            }
        }
    ,[])

    function SelecionarDia(index, diasSelecionados, setDiasSelecionados){
        setStatusBotao(!statusBotao);

        if (diasSelecionados.includes(index)){
            const filter = diasSelecionados.filter((elemento) => elemento !== index)
            setDiasSelecionados([...filter])
        
        } else {
            setDiasSelecionados([...diasSelecionados, index]);
        }
        
    }

    return(
        <Dia disabled={loading} statusBotao={statusBotao} onClick={()=>SelecionarDia(index, diasSelecionados, setDiasSelecionados)} data-test="habit-day">
            {dia}
        </Dia>
    )
}

const Dia = styled.button`
    width: 30px;
    height: 30px;
    background-color: ${({ statusBotao }) => statusBotao ? "#cfcfcf" : "#FFFFFF"};
    color: ${({ statusBotao }) => statusBotao ? "#FFFFFF" : "#dbdbdb"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;

    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
`