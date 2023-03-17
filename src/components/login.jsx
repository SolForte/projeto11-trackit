import styled from "styled-components";
import logo from "../assets/logo.png";
export default function Login(){
    return(
        <Main>
            <img src={logo} alt="TrackIt Logo"/>
        </Main> 
    )
}

const Main = styled.div`
    width: 375px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 180px;
    }
`