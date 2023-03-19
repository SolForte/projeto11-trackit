import styled from "styled-components"
import { Link } from "react-router-dom"

export default function Footer(){
    return (
        <Container>
            <SubContainer>
                <Link data-test="menu" to="/habitos">
                    <p>Hábitos</p>
                </Link>
                <Link to="/hoje">
                    <p>Hoje</p>
                </Link>
                <Link data-test="history-link" to="/historico">
                    <p>Histórico</p>
                </Link>
            </SubContainer>
        </Container>
    )
}

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