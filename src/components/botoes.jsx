import { useState } from "react";
import styled from "styled-components";

export default function WeekdayButtons(props){
    const {dia, index, status, diasSelecionados, setDiasSelecionados} = props;

    const [statusBotao, setStatusBotao] = useState(status);

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
        <Dia statusBotao={statusBotao} onClick={()=>SelecionarDia(index, diasSelecionados, setDiasSelecionados)}>
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
`