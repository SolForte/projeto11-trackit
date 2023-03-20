import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

export default function Header(){

    const {userData} = useContext(UserContext);

    return(
        <Container>
            <SubContainer data-test="header">
                <p>TrackIt</p>
                <img src={userData.image} alt="Sua foto de perfíl"/>
            </SubContainer>
        </Container>
    )
}

const Container = styled.div`
    opacity: 1;
    width: 100vw;
    height: 70px;
    background-color: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 1;
`

const SubContainer = styled.div`
    box-sizing:  border-box;
    width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 18px 0px 18px;
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
    p{
        font-family: 'Playball', cursive;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
`