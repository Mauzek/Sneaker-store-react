import Styles from './sneakerPatameters.module.css'

const SneakerParameters = ({ releaseDate, price, materials }) => {
  return (
    <div className={Styles["card-description__sneaker-parameters"]}>
    <div className={Styles["sneaker-parameters__parameters-header"]}>
      <p className={Styles["parameters-title"]}>О кроссах</p>
      <hr />
    </div>
    <div className={Styles["sneaker-parameters__parameters"]}>
      <ul className={Styles["parameters-list"]}>
        <li className={Styles["parameters-list__items"]}>
          <p className={Styles["parameter-title"]}>Дата выхода</p>
          <p className={Styles["parameter-value"]}>{releaseDate}</p>
        </li>
        <hr />
        <li className={Styles["parameters-list__items"]}>
          <p className={Styles["parameter-title"]}>Цена</p>
          <p className={` ${Styles["parameter-price"]} ${Styles["parameter-value"]} `}>
            {price} ₽
          </p>
        </li>
        <hr />
        <li className={Styles["parameters-list__items"]}>
          <p className={Styles["parameter-title"]}>Материалы</p>
          <p className={Styles["parameter-value"]}>{materials?.join(", ")}</p>
        </li>
        <hr />
      </ul>
    </div>
  </div>
  )
}

export default SneakerParameters