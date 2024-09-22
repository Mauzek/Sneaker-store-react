import React from "react";
import { CardCollection } from "../../../components/CardCollection/cardCollection";
import { useParams } from "react-router-dom";

export default function SneakerBrand() {
  const { title } = useParams();
  return (
    <section>
      <CardCollection
        title={title.toUpperCase().replaceAll("_", " ")}
        brand={title.replaceAll("_", " ")}
        length={9}
      />
    </section>
  );
}
