import React, { useEffect, useState } from "react"; // Импортируйте useEffect и useState
import images from "../../components/images";
import { BrandCard } from "../../components/BrandCard/brandCard";
import Styles from "./brands.module.css";
import { Preloader } from "../../components/Preloader/preloader";

const brands = [
  {
    image: images.adidas_logo,
    title: "Adidas",
    description:
      "Adidas is a global brand known for its sportswear and footwear, aiming to keep athletes at their peak performance.",
  },
  {
    image: images.new_balance_logo,
    title: "New Balance",
    description:
      "New Balance offers a blend of function and fashion, giving people the performance technology they need and the style they want.",
  },
  {
    image: images.nike_logo,
    title: "Nike",
    description:
      "Nike is a global leader in athletic footwear, apparel, and equipment, committed to pushing the limits of innovation.",
  },
  {
    image: images.skechers_logo,
    title: "Skechers",
    description:
      "Skechers offers a diverse range of footwear, blending style, innovation, quality, and comfort for all walks of life.",
  },
  {
    image: images.converse_logo,
    title: "Converse",
    description:
      "Converse sneakers have defined generations, known for their timeless style and iconic design since 1908.",
  },
  {
    image: images.puma_logo,
    title: "Puma",
    description:
      "Puma combines sports and lifestyle with performance and style, delivering products that are perfect for the modern athlete.",
  },
  {
    image: images.fila_logo,
    title: "Fila",
    description:
      "Fila is an international sports brand with a long history of blending performance and fashion in athletic footwear and apparel.",
  },
  {
    image: images.reebok_logo,
    title: "Reebok",
    description:
      "Reebok is dedicated to providing top-quality athletic footwear and apparel, pushing the boundaries of design and innovation.",
  },
];

export default function BrandsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={Styles["brands-page"]}>
      <div className={Styles["brands__container"]}>
        {loading ? (
          <Preloader />
        ) : (
          brands.map((brand, index) => {
            return <BrandCard {...brand} key={index} index={index} />;
          })
        )}
      </div>
    </section>
  );
}
