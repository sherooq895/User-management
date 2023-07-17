import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from"./pages/LoginAdmin"
import HomePage from "./pages/Home"
import Layout from "./components/Layout"
import CreateUser from "./pages/Createuser"
import Showusers from "./pages/Showusers"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route element={<Layout/>} >
            <Route path="/home" element={<HomePage/>} />
            <Route path="/createuser" element={<CreateUser/>} />
            <Route path="/showusers" element={<Showusers/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
