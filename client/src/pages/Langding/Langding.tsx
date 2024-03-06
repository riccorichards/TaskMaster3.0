import Intro from "../../components/intro/Intro";
import OurOffers from "../../components/ourOffers/OurOffers";
import { offers_pres } from "../../const";
import "./Langding.scss";

const Langding = () => {
  return (
    <div className="landing-page">
      <Intro />
      <main className="offers">
        {offers_pres.map((offer, i) => (
          <OurOffers offer={offer} index={i} />
        ))}
      </main>
    </div>
  );
};

export default Langding;
