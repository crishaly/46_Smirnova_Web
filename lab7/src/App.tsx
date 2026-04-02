import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import UsersPage from "./pages/UsersPage";
import BtcPage from "./pages/BtcPage";
import IpPage from "./pages/IpPage";
import "./App.css";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/btc" element={<BtcPage />} />
        <Route path="/ip" element={<IpPage />} />
      </Routes>
    </Router>
  );
}

export default App;