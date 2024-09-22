import React from "react";
import Styles from "./footer.module.css";
import {
  InstagramFilled,
  TwitterSquareFilled,
  YoutubeFilled,
} from "@ant-design/icons";

export const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  };

  return (
    <footer className={Styles.footer}>
      <div className={Styles.footer__section}>
        <h4 className={Styles.footer__title_logo} onClick={scrollToTop}>Кроссы— и точка.</h4>
      </div>
      <div className={Styles.footer__content}>
        <div className={Styles.footer__section}>
          <h4 className={Styles.footer__title}>Контакты</h4>
          <p className={Styles.footer__text}>Email: info@krossyi.ru</p>
          <p className={Styles.footer__text}>Телефон: +7 123 456 7890</p>
        </div>
        <div className={Styles.footer__section}>
          <h4 className={Styles.footer__title}>Социальные сети</h4>
          <ul className={Styles.footer__list}>
            <li
              className={`${Styles.footer__item} ${Styles.footer__item_twitter}`}
            >
              <a href="https://www.twitter.com" className={Styles.footer__link}>
                <TwitterSquareFilled className={Styles.footer__icon} />
              </a>
            </li>
            <li
              className={`${Styles.footer__item} ${Styles.footer__item_instagram}`}
            >
              <a
                href="https://www.instagram.com"
                className={Styles.footer__link}
              >
                <InstagramFilled className={Styles.footer__icon} />
              </a>
            </li>
            <li
              className={`${Styles.footer__item} ${Styles.footer__item_youtube}`}
            >
              <a href="https://www.youtube.com" className={Styles.footer__link}>
                <YoutubeFilled className={Styles.footer__icon} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={Styles.footer__bottom}>
        <p className={Styles.footer__text}>© 2024 Кроссы- и точка.</p>
      </div>
    </footer>
  );
};
