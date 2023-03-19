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
                    <p>Hábitos</p>
                </Link>
                
                <Link to="/hoje">
                    <Circular>
                        <CircularProgressbar value={userProgress} text="Hoje" styles={
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
                    </Circular>
                </Link>
                
                <Link data-test="history-link" to="/historico">
                    <p>Histórico</p>
                </Link>

            </SubContainer>
        </Container>
    )
}

const Circular = styled.div`

    
    display: flex;
    align-items: center;
    justify-content: center;

    width: 91px;
    height: 91px;
    box-sizing: border-box;
    background-color: #52B6FF;
    border-radius: 50%;
    position: absolute;
    
    bottom: 10px;
    left: 50%;
    transform: translate(-50%,-10%);
`

const Container = styled.div`
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
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
    a{
        text-decoration:none;
    }
`