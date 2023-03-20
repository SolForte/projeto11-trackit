import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserProgress } from "../contexts/UserProgress"
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export default function Footer(){

    const {userProgress} = useContext(UserProgress);

    return (
        <Container>
            <SubContainer data-test="menu">

                <Link to="/habitos" data-test="habit-link">
                    <MenuButton>Hábitos</MenuButton>
                </Link>
                
                <Link to="/hoje" data-test="today-link">

                    <Circular>
                        <CircularProgressbar 
                            value={userProgress} 
                            text="Hoje" 
                            styles={
                                    {
                                    path:{stroke: "#ffffff"},
                                    trail:{stroke: "#52B6FF"},
                                    text: 
                                        {fill: "#ffffff",
                                        fontFamily: 'Lexend Deca'
                                    }}
                                    }
                        />
                    </Circular>
                
                </Link>
                
                <Link data-test="history-link" to="/historico">
                    <MenuButton>Histórico</MenuButton>
                </Link>

            </SubContainer>
        </Container>
    )
}

const Circular = styled.div`
    width: 81px;
    padding: 5px;
    box-sizing: border-box;
    background-color: #52B6FF;
    border-radius: 100%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%,-10%);
`

const Container = styled.div`
    opacity: 1;
    width: 100vw;
    height: 70px;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0px;
    z-index: 1;
`

const SubContainer = styled.div`
    box-sizing:  border-box;
    width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 31px 0px 36px;
    a{
        text-decoration:none;
    }
`
const MenuButton = styled.button`
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
        background-color: #ffffff;
        border: none;
`
