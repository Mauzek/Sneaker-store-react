import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./brandCard.module.css";

const colors = [
  "#FFB6C1", // светло-розовый
  "#FFDAB9", // светло-персиковый
  "#FFFACD", // светло-лимонный
  "#E0FFFF", // светло-бирюзовый
  "#ADD8E6", // светло-голубой
  "#D8BFD8", // светло-фиолетовый
  "#F0E68C", // светло-желтый
  "#E6E6FA", // светло-лавандовый
];

export const BrandCard = ({ image, title, description, index }) => {
  const color = colors[index % colors.length];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles["brand-card"]}>
      <div className={styles["brand-card__flex"]}>
        <img
          alt="brand logo"
          src={image}
          className={styles["brand-card__img"]}
          style={{ backgroundColor: color }}
        />
        <div className={styles["brand-card__content"]}>
          <h2 className={styles["brand-card__title"]}>{title.toUpperCase()}</h2>
          <p className={styles["brand-card__description"]}>{description}</p>
          <Link
            onClick={scrollToTop}
            className={styles["brand-card__button"]}
            to={`/brands/${title.toLowerCase().replaceAll(" ", "_")}`}
          >
            {"Дальше >"}
          </Link>
        </div>
      </div>
    </div>
  );
};

BrandCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default BrandCard;
