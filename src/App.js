import { Route, Routes } from "react-router-dom";
import Home from "./Pages/home/index";
import NewPage from "./Pages/new/index";
import BrandsPage from "./Pages/brands/index";
import { Layout } from "./components/Layout/Layout";
import ProfilePage from "./Pages/profile";
import CartPage from "./Pages/cart/index";
import CatalogPage from "./Pages/catalog/index";
import SneakerPage from "./Pages/sneakers/[slug]";
import SneakerBrand from "./Pages/sneakerBrand/[slug]";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/brands/:title" element={<SneakerBrand />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/sneakers/:title" element={<SneakerPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
