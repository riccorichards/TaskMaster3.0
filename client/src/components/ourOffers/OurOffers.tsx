import { FC, useState } from "react";
import { OffersType } from "../../types";
import "./OurOffers.scss";

const OurOffers: FC<{ offer: OffersType; index: number }> = ({
  offer,
  index,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <section
      style={{
        display: "flex",
        flexDirection: offer.reverse ? "row-reverse" : "row",
      }}
      className="our-offer-wrapper"
      id={offer.id}
    >
      <div className="offer-info">
        {isOpen ? (
          <div>{offer.description}</div>
        ) : (
          <>
            <span>{`0${index + 1}`}</span>
            <div>
              <h1>{offer.title}.</h1>
              <p>{offer.desc}</p>
            </div>
          </>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Less" : "Read more"}
        </button>
      </div>
      <div className="video-wrapper">
        <video src={offer.source} autoPlay loop muted />
      </div>
    </section>
  );
};

export default OurOffers;
