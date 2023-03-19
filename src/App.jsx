import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./pages/cadastro";
import Habitos from "./pages/habitos";
import Historico from "./pages/historico";
import Hoje from "./pages/hoje";
import Login from "./pages/login";
import { useState } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {

  const [userData, setUserData ] = useState([]);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/habitos" element={<Habitos/>}/>
        <Route path="/hoje" element={<Hoje/>}/>
        <Route path="/historico" element={<Historico/>}/>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;