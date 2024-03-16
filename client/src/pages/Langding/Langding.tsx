import React, { Suspense } from "react";
import Footer from "../../components/footer/Footer";
import Intro from "../../components/intro/Intro";
const OurOffers = React.lazy(
  () => import("../../components/ourOffers/OurOffers")
);
import { offers_pres } from "../../const";
import "./Langding.scss";
import Loader from "../../components/Loader/Loader";

const Langding = () => {
  return (
    <div className="landing-page">
      <Intro />
      <main className="offers">
        <Suspense fallback={<Loader />}>
          {offers_pres.map((offer, i) => (
            <OurOffers offer={offer} index={i} key={i} />
          ))}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Langding;
