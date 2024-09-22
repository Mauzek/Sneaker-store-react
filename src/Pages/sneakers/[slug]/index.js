import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Styles from "./sneakers.module.css";
import { message } from "antd";
import SneakerParameters from "../../../components/SneakerParameters/sneakerParameters";
import { addToUserCart, getSneakerByName } from "../../../api/api-utils";
import { CardCollection } from "../../../components/CardCollection/cardCollection";
import { Preloader } from "../../../components/Preloader/preloader";
import { useStore } from "../../../appStore/store";

const SneakerPage = () => {
  const {userData} = useStore();
  const { title } = useParams();
  const formattedTitle = title.replaceAll("_", " ");
  const [sneaker, setSneaker] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        setLoading(true);
        const data = await getSneakerByName(formattedTitle);
        setSneaker(data.shift());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sneakers:", error);
        setLoading(false);
      }
    };
    fetchSneaker();
  }, [formattedTitle]);

  useEffect(() => {
    if (sneaker) {
      const availableSizes = sneaker.size.filter((size) => size.quantity > 0);
      const smallestSize = availableSizes.sort((a, b) => a.value - b.value)[0];

      setSelectedSize(smallestSize?.value || null);
      setSelectedPrice(smallestSize?.price || sneaker.price);
      setAvailableQuantity(
        availableSizes.reduce((acc, size) => acc + size.quantity, 0)
      );
    }
  }, [sneaker]);

  const handleSizeClick = (size) => {
    if (size.quantity > 0) {
      setSelectedSize(size.value);
      setSelectedPrice(size.price);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    addToUserCart(userData.id, {
      id: sneaker.id,
      image: sneaker.image,
      title: sneaker.title,
      description: sneaker.description,
      size: selectedSize,
      price: selectedPrice,
    })
    messageApi.open({
      type: "success",
      content: "Товар добавлен в корзину",
    });
  };

  const getRandomPage = (page) => {
    const value = Math.floor(Math.random() * page);
    return value === 0 ? 1 : value;
  };

  const [randomPage] = useState(() => getRandomPage(10));

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <section className={Styles["section-info"]}>
        <div className={Styles["sneaker"]}>
          <div className={Styles["sneaker__info"]}>
            <img
              src={sneaker.image}
              alt={sneaker.title}
              className={Styles["sneaker__image"]}
            />
            <div className={Styles["sneaker__details"]}>
              <h1 className={Styles["sneaker__title"]}>{sneaker.title}</h1>
              <p className={Styles["sneaker__description"]}>
                {sneaker.description}
              </p>
              <div className={Styles["card-description__sneaker-parameters"]}>
                <SneakerParameters
                  releaseDate={sneaker.releaseDate}
                  price={selectedPrice}
                  materials={sneaker.material}
                />
              </div>
              <div>
                Размер:
                {sneaker.size?.map((size, index) => (
                  <span
                    className={`${Styles["sneaker__size"]} ${
                      size.quantity <= 0 && Styles["sneaker__size--unavailable"]
                    } ${
                      selectedSize === size.value &&
                      Styles["sneaker__size--selected"]
                    }`}
                    key={index}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size.value}
                  </span>
                ))}
              </div>
              <div className={Styles["sneaker__purchase"]}>
                <h3 className={Styles["purchase__title"]}>{selectedPrice} ₽</h3>
                {contextHolder}
                <button
                  onClick={success}
                  className={Styles["purchase__button"]}
                  disabled={availableQuantity === 0}
                >
                  Добавить в корзину
                </button>
              </div>
              <div className={Styles["container__quantity"]}>
                <p className={Styles["quantity__title"]}>
                  В наличии: {availableQuantity} шт.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={Styles["container__sneakers-list"]}>
        <CardCollection
          title="Mогут понравиться"
          category={sneaker.popular ? "popular" : "new"}
          length={3}
          eliminate={sneaker.id.toString()}
          page={randomPage}
        />
      </section>
    </>
  );
};

export default SneakerPage;
