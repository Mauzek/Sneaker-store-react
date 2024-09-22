import React, { useEffect, useState } from "react";
import { useStore } from "../../appStore/store";
import {
  deleteSneakerFromCart,
  getUserCart,
  updateSneakerQuantity,
} from "../../api/api-utils";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { Preloader } from "../../components/Preloader/preloader";
import { DeleteOutlined } from "@ant-design/icons";

function CartPage() {
  const { userData } = useStore();
  const [cart, setCart] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      if (userData && userData.id) {
        const userCart = await getUserCart(userData.id);
        if (userCart.length > 0) {
          setCart(userCart[0]);
          setSelectedItems(userCart[0].items.map((item) => item.id));
        }
      }
    };
    fetching();
  }, [userData]);

  if (!userData || !userData.id) {
    return (
      <div className={styles["cart-page"]}>
        <h1 className={styles["cart-page__header"]}>Корзина</h1>
        <div className={styles["cart-page__content"]}>
          <div className={styles["cart-page__auth-message"]}>
            <p className={styles["cart-page__auth-text"]}>
              Вы не авторизованы. Пожалуйста, войдите в систему или
              зарегистрируйтесь.
            </p>
            <div className={styles["cart-page__auth-buttons"]}>
              <Link to="/profile" className={styles["cart-page__auth-button"]}>
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart) {
    return <Preloader />;
  }

  const handleDelete = async (sneakerId) => {
    const result = await deleteSneakerFromCart(userData.id, sneakerId);
    if (result.success) {
      setCart((prevCart) => {
        const updatedItems = prevCart.items.filter(
          (item) => item.id !== sneakerId
        );
        const updatedTotalQuantity = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const updatedTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return {
          ...prevCart,
          items: updatedItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      });
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== sneakerId)
      );
    } else {
      console.error(result.error);
    }
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    const result = await updateSneakerQuantity(
      userData.id,
      itemId,
      newQuantity
    );
    if (result.success) {
      setCart((prevCart) => {
        const updatedItems = prevCart.items.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );
        const updatedTotalQuantity = updatedItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
        const updatedTotalPrice = updatedItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        return {
          ...prevCart,
          items: updatedItems,
          totalQuantity: updatedTotalQuantity,
          totalPrice: updatedTotalPrice,
        };
      });
    } else {
      console.error(result.error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const selectedItemsData = cart.items.filter((item) =>
    selectedItems.includes(item.id)
  );
  const selectedTotalQuantity = selectedItemsData.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const selectedTotalPrice = selectedItemsData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles["cart-page"]}>
      <h1 className={styles["cart-page__header"]}>Корзина</h1>
      <div className={styles["cart-page__content"]}>
        <div className={styles["cart-page__items"]}>
          {cart.items.map((item) => (
            <div key={item.id} className={styles["cart-item"]}>
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
                className={styles["cart-item__checkbox"]}
              />
              <img
                src={item.image}
                alt={item.title}
                className={styles["cart-item__image"]}
              />
              <div className={styles["cart-item__details"]}>
                <Link
                  onClick={scrollToTop}
                  to={`/sneakers/${item.title.replaceAll(" ", "_")}`}
                  key={item.id}
                >
                  <h2 className={styles["cart-item__title"]}>{item.title}</h2>
                  <p className={styles["cart-item__description"]}>
                    {item.description}
                  </p>
                  <p className={styles["cart-item__price"]}>
                    <span className={styles["cart-item__price--label"]}>
                      Цена:{" "}
                    </span>
                    {item.price} руб.
                  </p>
                  <p className={styles["cart-item__size"]}>
                    <span className={styles["cart-item__size--label"]}>
                      Размер:{" "}
                    </span>
                    {item.size}
                  </p>
                </Link>
                <div className={styles["cart-item__controls"]}>
                  <button
                    className={styles["cart-item__delete-button"]}
                    onClick={() => handleDelete(item.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
              <div className={styles["cart-item__quantity"]}>
                <button
                  className={styles["cart-item__quantity-button"]}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className={styles["cart-item__quantity-value"]}>
                  {item.quantity}
                </span>
                <button
                  className={styles["cart-item__quantity-button"]}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={styles["cart-page__summary"]}>
          <button className={styles["cart-page__order-button"]}>
            Оформить заказ
          </button>
          <div className={styles["cart-page__summary-item"]}>
            <span className={styles["cart-page__summary-label"]}>
              Общая сумма:
            </span>
            <span className={styles["cart-page__summary-value"]}>
              {selectedTotalPrice} руб.
            </span>
          </div>
          <div className={styles["cart-page__summary-item"]}>
            <span className={styles["cart-page__summary-label"]}>
              Всего товаров:
            </span>
            <span className={styles["cart-page__summary-value"]}>
              {selectedTotalQuantity}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
