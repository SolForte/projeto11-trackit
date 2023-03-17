import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from "./components/cadastro";
import Habitos from "./components/habitos";
import Historico from "./components/historico";
import Hoje from "./components/hoje";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route path="/habitos" element={<Habitos/>}/>
        <Route path="/hoje" element={<Hoje/>}/>
        <Route path="/historico" element={<Historico/>}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
