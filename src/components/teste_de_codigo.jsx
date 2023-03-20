
        habitsList !== null && habitsList !== undefined
        
        ? 
        
        habitsList.map(
            (habito, index) => {

                function tratamentoDeDados(event){
                    setToggleStatus(true);
                    setCurrent([...current, habito.id]);
                    if (habito.done !== true){
                        const body = {}
                        const config = {headers: {Authorization: `Bearer ${userData.token}`}};
                        const marcar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/check`, body, config);
                        marcar.then(
                            (resposta) => {
                                console.log(resposta)
                                fetchHabits()
                                setToggleStatus(false);
                                setCurrent([]);
                            }
                        )
                        marcar.catch(
                            (resposta) => {
                                fetchHabits()
                                setToggleStatus(false);
                            }
                        )
                    } else {
                        const body = {}
                        const config = {headers: {Authorization: `Bearer ${userData.token}`}};
                        const marcar = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habito.id}/uncheck`, body, config);
                        marcar.then(
                            (resposta) => {
                                setHabitsList(resposta.data);
                                setToggleStatus(false);
                                setCurrent([]);
                            })
                        marcar.catch(
                            (resposta) => {
                                setToggleStatus(false);
                            }
                            )
                    }
                }

                return (
                    <div key={index}>
                        <div>
                            <p>{habito.name}</p>
                            <p>Sequência atual: <span>{habito.currentSequence} {habito.currentSequence > 1 ? "dias" :  habito.currentSequence !== 0 ? "dia" : ""}</span></p>
                            <p>Seu recorde: <span>{habito.highestSequence} {habito.highestSequence > 1 ? "dias" : habito.highestSequence !== 0 ? "dia" : ""}</span></p>
                        </div>
                        <CheckmarkButton 
                            onClick={tratamentoDeDados}
                            toggleStatus={toggleStatus}
                            disabled={toggleStatus !== false && current.includes(habito.id)}>
                                <ion-icon name="checkmark"></ion-icon>
                        </CheckmarkButton>
                    </div>
                )
            }
        )
        
        : "No"
        