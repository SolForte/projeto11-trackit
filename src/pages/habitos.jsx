import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Habitos(){

    const {userData} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        
        console.log(userData);
        const token = userData.token;
        const config = {headers: {Authorization: `Bearer ${token}`}};

        const habits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);
        habits.then(
            (resposta) => {
                console.log(resposta);
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
        <></>
    )
}