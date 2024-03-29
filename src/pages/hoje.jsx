import Header from "../components/header";
import Footer from "../components/footer";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useState } from "react";
import { UserProgress } from "../contexts/UserProgress";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Diarias from "../components/daillies";

export default function Hoje() {
  const { userData } = useContext(UserContext);
  const { userProgress } = useContext(UserProgress);

  const [habitsList, setHabitsList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const DIAS_DA_SEMANA = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
  ];

  useEffect(() => {
    fetchHabits();
  }, [refresh]);

  function fetchHabits() {
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };

    const habits = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,
      config
    );
    habits.then((resposta) => {
      setHabitsList(resposta.data);
    });
    habits.catch((resposta) => {
      alert(
        `Erro ${resposta.response.status} - ${resposta.response.data.message}`
      );
      navigate("/");
    });
  }

  function data() {
    const hoje = new Date();
    const dia = DIAS_DA_SEMANA[hoje.getDay()];
    const data = hoje.getDate();
    //Adiçãode +1 pois getMonth() é zero indexed e.g. Janeiro = 0 e Dezembro = 12
    const mes = hoje.getMonth() + 1;
    const dezena = 10;
    //Ternário para adicionar 0 antes dos dias/meses menos que 10 para ver se resolve avaliador do HUB
    return `${dia}, ${data < dezena ? "0" + data : data}/${
      mes < dezena ? "0" + mes : mes
    }`;
  }

  return (
    <Main>
      <Header />
      <Container>
        <DataHoje data-test="today">{data()}</DataHoje>

        <PorcentagemConcluida
          data-test="today-counter"
          cor={userProgress !== 0 && !isNaN(userProgress)}
        >
          {userProgress !== 0 &&
          userProgress !== undefined &&
          !isNaN(userProgress)
            ? `${userProgress}% dos hábitos concluídos`
            : `Nenhum hábito concluído ainda`}
        </PorcentagemConcluida>

        <DaillyGap>
          <Diarias
            habitsList={habitsList}
            refresh={refresh}
            setRefresh={setRefresh}
          ></Diarias>
        </DaillyGap>
      </Container>
      <Footer />
    </Main>
  );
}

const DaillyGap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 28px;
`;

const Container = styled.div`
    padding-top: 92px;
    width: 340px;
`;

const PorcentagemConcluida = styled.p`
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${(props) => (props.cor ? "#8FC549" : "#BABABA")};
`;

const Main = styled.div`
    width: 100vw;
    margin-bottom: 178px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DataHoje = styled.p`
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 22.976px;
        line-height: 29px;
        color: #126BA5;
`;