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
                console.log(resposta.data)
            }
        )
        habits.catch(
            (resposta) => {
                //alert(`Erro ${resposta.response.status} - ${resposta.response.data.message}`)
                navigate("/")
            }
        )
    },[])

    return(
        <Main>
            <Header/>
            <Content>
                <Criar>
                <p>Meus Hábitos</p>
                <button>
                    <p>+</p>
                </button>
                </Criar>
                {(habitsList.length === 0) 
                ? <Tip>
                    <p>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                    </p>
                </Tip> 
                : <></>}
            </Content>
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

const Content = styled.div`
    margin-top: 92px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Criar = styled.div`
    width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0px 18px 0px 17px;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
    }
    button{
        width: 40px;
        height: 35px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            font-family: 'Lexend Deca', sans-serif;
            font-weight: 400;
            font-size: 26.976px;
            line-height: 34px;
            color: #FFFFFF;
            box-sizing: border-box;
            padding-bottom: 4px;
        }
    }
`

const Tip = styled.div`
    width: 375px;
    box-sizing: border-box;
    padding: 28px 20px 0px 17px;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666
    }
`