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
import Loading from "../constants/loading";

export default function Habitos() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [habitsList, setHabitsList] = useState([]);

  const [criacao, setCriacao] = useState(false);

  const semana = [...weekdays];
  const [diasSelecionados, setDiasSelecionados] = useState([]);

  const [habitName, setHabitName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  function fetchHabits() {
    const config = { headers: { Authorization: `Bearer ${userData.token}` } };

    const habits = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
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

  function criar() {
    setLoading(true);
    const corpo = {
      name: habitName,
      days: diasSelecionados,
    };

    const config = { headers: { Authorization: `Bearer ${userData.token}` } };

    setDiasSelecionados([]);
    setHabitName([]);

    const create = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits`,
      corpo,
      config
    );
    create.then(() => {
      fetchHabits();
      setLoading(false);
      setCriacao(false);
    });
    create.catch((resposta) => {
      setLoading(false);
      alert(
        `Erro ${resposta.response.status} - ${resposta.response.data.message}`
      );
    });
  }

  return (
    <Main>
      <Header />
      <CreationMenu>
        <p>Meus Hábitos</p>
        <button onClick={() => setCriacao(true)} data-test="habit-create-btn">
          <p>+</p>
        </button>
      </CreationMenu>

      {criacao === true ? (
        <Criacao data-test="habit-create-container">
          <input
            disabled={loading}
            data-test="habit-name-input"
            placeholder="Nome do hábito"
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
          />

          <WeekdayButtonsContainer>
            {semana.map((value, index) => {
              return (
                <WeekdayButtons
                  key={index}
                  dia={value.dia}
                  index={index}
                  status={value.status}
                  diasSelecionados={diasSelecionados}
                  setDiasSelecionados={setDiasSelecionados}
                  loading={loading}
                />
              );
            })}
          </WeekdayButtonsContainer>

          <CancelAcceptContainer>
            <Cancelar
              disabled={loading}
              onClick={() => setCriacao(false)}
              data-test="habit-create-cancel-btn"
            >
              Cancelar
            </Cancelar>
            <Salvar
              disabled={loading}
              data-test="habit-create-save-btn"
              onClick={() => {
                criar();
              }}
            >
              {loading ? <Loading /> : "Salvar"}
            </Salvar>
          </CancelAcceptContainer>
        </Criacao>
      ) : (
        <></>
      )}

      {habitsList.length === 0 ? (
        <Tip>
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        </Tip>
      ) : (
        <HabitsContainer>
          {habitsList.map((element, index) => {
            function deletar(element) {
              if (
                window.confirm("Gostaria de realmente apagar o hábito?") ===
                true
              ) {
                const config = {
                  headers: { Authorization: `Bearer ${userData.token}` },
                };

                const apagar = axios.delete(
                  `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${element.id}`,
                  config
                );
                apagar.then(() => fetchHabits());
                apagar.catch((resposta) => {
                  alert(resposta.response.data.message);
                });
              }
            }

            return (
              <HabitBox key={index} data-test="habit-container">
                <HabitName data-test="habit-name">{element.name}</HabitName>

                <HabitSemana>
                  {semana.map((dia, index) => (
                    <HabitDias
                      data-test="habit-day"
                      disabled={true}
                      statusBotao={element.days.includes(index)}
                      key={index}
                    >
                      {dia.dia}
                    </HabitDias>
                  ))}
                </HabitSemana>

                <Lixo
                  onClick={() => {
                    deletar(element);
                  }}
                  data-test="habit-delete-btn"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                </Lixo>
              </HabitBox>
            );
          })}
        </HabitsContainer>
      )}

      <Footer />
    </Main>
  );
}

const HabitSemana = styled.div`
    display: flex;
    gap: 4px;
    margin: 0px 0px 15px 14px;
`;

const HabitDias = styled.button`
        width: 30px;
        height: 30px;
        background-color: ${({ statusBotao }) =>
          statusBotao ? "#cfcfcf" : "#FFFFFF"};
        color: ${({ statusBotao }) => (statusBotao ? "#FFFFFF" : "#dbdbdb")};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        :disabled{
            cursor: default;
        }
`;

const HabitName = styled.p`
    width: 208px;
    height: 25px;
    font-family: 'Lexend Deca', sans-serif;
    font-weight: 400;
    font-size: 19.976px;
    line-height: 25px;
    color: #666666;
    margin: 13px 0px 10px 15px;
`;

const Lixo = styled.div`
    position: absolute;
    top: 11px;
    right: 10px;
    cursor: pointer;
`;

const HabitBox = styled.div`
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    margin-top: 22px;
`;

const CancelAcceptContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 29px 16px 15px 0px;
    button{
        outline: none;
        border: none;
        width: 84px;
        height: 35px;
        border-radius: 4.63636px;
        font-size: 15.976px;
        line-height: 20px;
        font-family: 'Lexend Deca', sans-serif;
    }
`;

const Cancelar = styled.button`
    color: #52B6FF;
    background-color: transparent;
    margin-right: 23px;
`;
const Salvar = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background-color: #52B6FF;`;

const WeekdayButtonsContainer = styled.div`
    padding-left: 19px;
    gap: 4px;
    display: flex;
`;

const Criacao = styled.div`
    margin-top: 20px;
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
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
`;

const Main = styled.div`
    width: 100vw;
    margin-bottom: 178px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CreationMenu = styled.div`
    padding-top: 92px;
    width: 340px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
`;

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
`;