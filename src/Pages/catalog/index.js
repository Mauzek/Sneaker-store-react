import React, { useState } from "react";
import FilterPanel from "../../components/FilterPanel/filterPanel";
import { CardCollection } from "../../components/CardCollection/cardCollection";

function CatalogPage() {
  const [filters, setFilters] = useState({
    brand: "All Brands",
    minPrice: "",
    maxPrice: "",
    searchTerm: "",
    category: "",
    size: "",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <FilterPanel onFilterChange={handleFilterChange} />
      <CardCollection
        title={`Sneakers Catalog (${filters.brand} ${
          filters?.category.length ? `{${filters.category}}` : "{...}"
        })`}
        filters={filters}
        brand={filters.brand}
      />
    </>
  );
}

export default CatalogPage;
