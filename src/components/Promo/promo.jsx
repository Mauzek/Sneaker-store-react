import React from "react";
import Styles from "./promo.module.css";
import videoSrc from '../../assets/videos/promo.mp4';
import { ArrowDownOutlined } from '@ant-design/icons';

export const Promo = () => {
  return (
    <div className={Styles.promo__container}>
      <div className={Styles.promo__wrapper}>
        <video className={Styles.promo__backgroundVideo} src={videoSrc} loop autoPlay muted></video>
        <div className={Styles.promo__overlay} />
        <div className={Styles.promo__content}>
          <h3 className={Styles.promo__content_title}>Скидка до 40% на химчистку</h3>
          <p className={Styles.promo__content_description}>Кликни чтобы открыть промокод</p>
          <ArrowDownOutlined className={Styles.promo__content_icon} />
          <button className={Styles.promo__content_button}>Промокод</button>
        </div>
      </div>
    </div>
  );
};
