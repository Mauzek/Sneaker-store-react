import React, { useState } from "react";
import Styles from "./card.module.css";
import { Link } from "react-router-dom";

const colors = [
  "#FF6347",
  "#FF8C00",
  "#FFD700",
  "#008000",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

export const Card = ({ image, title, description }) => {
  const [color, setColor] = useState(null);

  const handleMouseEnter = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  };

  const handleMouseLeave = () => {
    setColor(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <Link
      to={`/sneakers/${title.replaceAll(" ", "_")}`}
      className={Styles["card"]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={scrollToTop}
      style={{ "--color": color }}
    >
      <div className={Styles["card__img-container"]}>
        <img className={Styles["card__image"]} src={image} alt="sneaker" />
      </div>
      <div className={Styles["card__text-container"]}>
        <p className={Styles["card__title"]}>{title}</p>
        <p className={Styles["card__description"]}>{description}</p>
      </div>
    </Link>
  );
};
