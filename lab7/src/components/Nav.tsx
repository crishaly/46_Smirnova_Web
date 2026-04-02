import { NavLink } from "react-router-dom";

const Nav = () => (
  <nav className="main-nav">
    <NavLink to="/users">Пользователи</NavLink>
    <NavLink to="/btc">Курс BTC</NavLink>
    <NavLink to="/ip">Мой IP</NavLink>
  </nav>
);

export default Nav;