import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";
import { weekdays } from "../constants/weekdays";
import WeekdayButtons from "../components/botoes";

export default function Habitos(){

    const {userData} = useContext(UserContext);
    const navigate = useNavigate();

    const [habitsList, setHabitsList] = useState([]);

    const [criacao, setCriacao] = useState(false);

    const [semana, setSemana] = useState(weekdays);
    const [diasSelecionados, setDiasSelecionados] = useState([]);
    
    
    useEffect(()=>{
        
        const config = {headers: {Authorization: `Bearer ${userData.token}`}};

        const habits = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`, config);
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
    },[])

    function criar(){}


    return(
        <Main>
            <Header/>
            <Content>
                <CreationMenu>
                <p>Meus Hábitos</p>
                <button onClick={()=>setCriacao(true)}>
                    <p>+</p>
                </button>
                </CreationMenu>

          
                {(criacao === true)
                ? <Criacao>

                <input 
                    placeholder="nome do hábito"
                />
                
                <ButtonEncloserContainer>

                    {semana.map(
                        (value, index) => {

                        return(
                            <WeekdayButtons 
                                key={index} 
                                dia={value.dia} 
                                index={index}
                                status={value.status}
                                diasSelecionados={diasSelecionados}
                                setDiasSelecionados={setDiasSelecionados}
                            />
                            )
                        }
                    )}

                </ButtonEncloserContainer>



                </Criacao>
                : <></>
                }

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

const ButtonEncloserContainer = styled.div`
    display: flex;
    gap: 4px;
    box-sizing: border-box;
    padding: 0px 18px 0px 19px;
`

const Criacao = styled.div`
    margin: 20px 18px 0px 17px;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    input{
        margin: 18px 18px 8px 19px;
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        ::placeholder{
            color: #DBDBDB;  
        }
    }
`

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

const CreationMenu = styled.div`
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