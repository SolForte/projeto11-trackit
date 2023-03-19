import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";

export default function Historico(){
    return(
    <Main>
        <Header/>
        <Content>
                <CreationMenu>
                    <p>Histórico</p>
                </CreationMenu>
                <Tip>
                    <p>
                        Em breve você poderá ver o histórico dos seus hábitos aqui!
                    </p>
                </Tip> 
        </Content>
        <Footer/>
    </Main>)
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
    padding: 17px 20px 0px 17px;
    p{
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666
    }
`