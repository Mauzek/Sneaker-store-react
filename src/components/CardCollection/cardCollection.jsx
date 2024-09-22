import React, { useEffect, useState } from "react";
import { Card } from "../Card/card";
import Styles from "./cardCollection.module.css";
import PropTypes from "prop-types";
import {
  getSneakersByFilters,
  getSneakersAll,
  getSneakersByCategory,
  getSneakersByBrand,
} from "../../api/api-utils";
import { Preloader } from "../Preloader/preloader";

export const CardCollection = ({
  title,
  filters,
  category,
  length,
  brand,
  eliminate = "0",
  page = 1,
}) => {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        setLoading(true);
        let data;
        if (
          brand === "All Brands" &&
          !filters.minPrice &&
          !filters.maxPrice &&
          !filters.size &&
          !filters.searchTerm &&
          !filters.category
        ) {
          data = await getSneakersAll();
        } else if (filters) {
          data = await getSneakersByFilters(filters);
        } else if (brand && brand !== "All Brands") {
          data = await getSneakersByBrand(brand, length, page);
        } else {
          data = await getSneakersByCategory(length, page, category);
        }
        setSneakers(data);
      } catch (error) {
        console.error("Error fetching sneakers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSneakers();
  }, [filters, page, length, category, brand]);

  const filteredSneakers = sneakers.filter(
    (sneaker) => sneaker.id !== parseInt(eliminate, 10)
  );

  if (loading) {
    return <Preloader />;
  }

  return (
    <section className={Styles["card-collection__container"]}>
      <h2 className={Styles["card-collection__title"]}>{title}</h2>
      <hr className={Styles["card-collection__divider"]} />
      <div className={Styles["card-collection__container-inner"]}>
        <div className={Styles["card-collection__wrapper"]}>
          {filteredSneakers.length === 0 ? (
            <p>Простите, но ничего не нашло</p>
          ) : (
            filteredSneakers.map((sneaker, index) => (
              <Card {...sneaker} index={index} key={sneaker.id} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

CardCollection.propTypes = {
  title: PropTypes.string.isRequired,
  length: PropTypes.number,
  category: PropTypes.string,
  brand: PropTypes.string,
  eliminate: PropTypes.string,
  page: PropTypes.number,
  filters: PropTypes.object,
};
