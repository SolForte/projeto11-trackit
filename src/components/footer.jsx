import styled from "styled-components"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { UserProgress } from "../contexts/UserProgress"
import { CircularProgressbar } from "react-circular-progressbar";

export default function Footer(){

    const {userProgress} = useContext(UserProgress);

    return (
        <Container>
            <SubContainer>

                <Link to="/habitos">
                    <MenuButton>Hábitos</MenuButton>
                </Link>
                
                <Link to="/hoje">

                    <Circular>
                        <CircularProgressbar value={userProgress} styles={
                        {
                        path:{stroke: "#ffffff"},
                        text: 
                            {
                            fill: "#ffffff", 
                            fontSize: "17px", 
                            fontFamily: 'Lexend Deca',
                            fontWeight: "400"
                        }}
                        }
                        />
                        <p>Hoje</p>
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
    width: 91px;
    height: 91px;
    box-sizing: border-box;
    background-color: #52B6FF;
    border-radius: 100%;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translate(-50%,-10%);
    p{
        position: absolute;
        left: 50%;
        bottom: 40%;
        transform: translate(-50%,-0%);
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #FFFFFF
    }
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
