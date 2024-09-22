import React from "react";
import { Link, NavLink } from "react-router-dom";
import Styles from "./header.module.css";
import logo from "../../assets/images/logo.png";
import { Tabs } from "antd";

export const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header>
      <div className={Styles.header__container}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <nav className={Styles.navbar}>
          <Tabs />
          <ul className={Styles.navbar__list}>
            <li>
              <NavLink
                onClick={scrollToTop}
                className={Styles.navbar__list__item}
                to="/new"
              >
                Новинки
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={scrollToTop}
                className={Styles.navbar__list__item}
                to="/brands"
              >
                Бренды
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={scrollToTop}
                className={Styles.navbar__list__item}
                to="/catalog"
              >
                Каталог
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={scrollToTop}
                className={Styles.navbar__list__item}
                to="/cart"
              >
                Корзина
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={scrollToTop}
                className={Styles.navbar__list__item}
                to="/profile"
              >
                Профиль
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
