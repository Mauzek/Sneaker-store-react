import { Banner } from "../../components/Banner/banner";
import { CardCollection } from "../../components/CardCollection/cardCollection";
import { Promo } from "../../components/Promo/promo";

const Home = () => {
  return (
    <div>
      <Banner />
      <CardCollection title="Popular sneakers" category="popular" length={6}/>
      <CardCollection title="New sneakers" category="new" length={6}/>
      <Promo />
    </div>
  );
};

export default Home;
