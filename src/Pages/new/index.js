import React, { useState } from "react";
import Styles from './newSneakers.module.css';
import { CardCollection } from "../../components/CardCollection/cardCollection";
import Pagination from '@mui/material/Pagination'; 

const NewSneakersPage = () => {
  const [page, setPage] = useState(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <section >
      <CardCollection title="Новинки" category="new" length={9} page={page} />
      <Pagination
      className={Styles["pagination__container"]}
        count={4}
        page={page}
        onChange={(_, num) => {setPage(num); scrollToTop();}}
        variant="outlined"
        shape="rounded"
        color="error"
      />
    </section>
  );
};

export default NewSneakersPage;
