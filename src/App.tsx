import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Home from "./components/Home";
import MainGame from "./components/MainGame";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="game" element={<Auth />}>
          <Route index element={<MainGame />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
