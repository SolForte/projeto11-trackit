import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Habitos from "./pages/habitos";
import Historico from "./pages/historico";
import Hoje from "./pages/hoje";
import Login from "./pages/login";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { UserProgress } from "./contexts/UserProgress";

function App() {

  const [userData, setUserData ] = useState([]);
  const [userProgress, setUserProgress] = useState(75);


  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
      <UserProgress.Provider value={{userProgress, setUserProgress}}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/habitos" element={<Habitos/>}/>
        <Route path="/hoje" element={<Hoje/>}/>
        <Route path="/historico" element={<Historico/>}/>
      </Routes>
      </UserProgress.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;