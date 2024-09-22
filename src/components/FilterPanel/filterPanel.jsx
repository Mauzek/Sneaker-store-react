import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import Styles from "./filterPanel.module.css";
import { debounce } from "lodash";

const brands = [
  { title: "All Brands" },
  { title: "Adidas" },
  { title: "New Balance" },
  { title: "Nike" },
  { title: "Skechers" },
  { title: "Converse" },
  { title: "Puma" },
  { title: "Fila" },
  { title: "Reebok" },
];

export const FilterPanel = ({ onFilterChange }) => {
  const [brand, setBrand] = useState("All Brands");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState("");

  const debouncedFn = useMemo(() => {
    return debounce((newFilters) => {
      onFilterChange(newFilters);
    }, 300);
  }, [onFilterChange]);

  const handleFilterChange = useCallback(
    (newFilters) => {
      debouncedFn(newFilters);
    },
    [debouncedFn]
  );

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setCategory((prevCategories) => {
      const newCategories = checked
        ? [...prevCategories, value]
        : prevCategories.filter((cat) => cat !== value);
      handleFilterChange({
        brand,
        minPrice,
        maxPrice,
        searchTerm,
        category: newCategories,
        size,
      });
      return newCategories;
    });
  };

  return (
    <section className={Styles["filter-panel-container"]}>
      <div className={Styles["filter-panel"]}>
        <div className={Styles["filter-panel__item"]}>
          <label htmlFor="searchTerm" className={Styles["filter-panel__label"]}>
            Поиск:
          </label>
          <input
            id="searchTerm"
            className={Styles["filter-panel__input"]}
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange({
                brand,
                minPrice,
                maxPrice,
                searchTerm: e.target.value,
                category,
                size,
              });
            }}
          />
        </div>
        <div className={Styles["filter-panel__row"]}>
          <div className={Styles["filter-panel__item"]}>
            <label htmlFor="brand" className={Styles["filter-panel__label"]}>
              Бренд:
            </label>
            <select
              id="brand"
              className={Styles["filter-panel__select"]}
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                handleFilterChange({
                  brand: e.target.value,
                  minPrice,
                  maxPrice,
                  searchTerm,
                  category,
                  size,
                });
              }}
            >
              {brands.map((b) => (
                <option key={b.title} value={b.title}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
          <div className={Styles["filter-panel__item"]}>
            <label htmlFor="size" className={Styles["filter-panel__label"]}>
              Размер:
            </label>
            <select
              id="size"
              className={Styles["filter-panel__select"]}
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                handleFilterChange({
                  brand,
                  minPrice,
                  maxPrice,
                  searchTerm,
                  category,
                  size: e.target.value,
                });
              }}
            >
              <option value="">Всё размеры</option>
              {Array.from({ length: 10 }, (_, i) => 37 + i).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={Styles["filter-panel__column"]}>
          <div className={Styles["filter-panel__item"]}>
            <label className={Styles["filter-panel__label"]}>
              Цена:
            </label>
            <div className={Styles["filter-panel__price-range"]} >
              <input
                id="minPrice"
                className={Styles["filter-panel__input"]}
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  handleFilterChange({
                    brand,
                    minPrice: e.target.value,
                    maxPrice,
                    searchTerm,
                    category,
                    size,
                  });
                }}
              />
              <input
                id="maxPrice"
                className={Styles["filter-panel__input"]}
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  handleFilterChange({
                    brand,
                    minPrice,
                    maxPrice: e.target.value,
                    searchTerm,
                    category,
                    size,
                  });
                }}
              />
            </div>
          </div>
          <div className={Styles["filter-panel__item"]}>
            <label className={Styles["filter-panel__label"]}>Категории:</label>
            <div className={Styles["filter-panel__radio-group"]}>
              <label className={Styles["filter-panel__radio-label"]}>
                <input
                  type="checkbox"
                  name="category"
                  value="new"
                  checked={category.includes("new")}
                  onChange={handleCategoryChange}
                />
                Новики
              </label>
              <label className={Styles["filter-panel__radio-label"]}>
                <input
                  type="checkbox"
                  name="category"
                  value="popular"
                  checked={category.includes("popular")}
                  onChange={handleCategoryChange}
                />
                Популярные
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

FilterPanel.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default FilterPanel;
