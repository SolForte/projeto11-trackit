import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        display: flex;
        justify-content: center;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 6px;
        input{
            background: #FFFFFF;
            border: 1px solid #D5D5D5;
            border-radius: 5px;
            width: 303px;
            height: 45px;
            font-weight: 400;
            font-size: 19.976px;
            line-height: 25px;
            font-family: 'Lexend Deca', sans-serif;
            ::placeholder{
                color: #DBDBDB;
            }
            :disabled{
                background: #F2F2F2;
                color: #AFAFAF;
            }
        }
        button{
            width: 303px;
            height: 45px;
            left: 36px;
            top: 381px;
            background: #52B6FF;
            border: none;
            border-radius: 4.63636px;
            font-family: 'Lexend Deca', sans-serif;
            font-weight: 400;
            font-size: 20.976px;
            line-height: 26px;
            text-align: center;
            color: #FFFFFF;
        }
    }
`

export default GlobalStyle;