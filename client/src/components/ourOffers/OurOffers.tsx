import { FC, useEffect, useRef, useState } from "react";
import { OffersType } from "../../types";
import "./OurOffers.scss";

const OurOffers: FC<{ offer: OffersType; index: number }> = ({
  offer,
  index,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const offerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handlerScreen = () => {
      setScreenSize(window.innerWidth);
    };

    window.addEventListener("resize", handlerScreen);

    return () => window.removeEventListener("resize", handlerScreen);
  }, [screenSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = offerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const isMobileSize = screenSize < 425;
  const isTabletSize = screenSize < 768;
  return (
    <section
      ref={offerRef}
      style={{
        display: "flex",
        opacity: isVisible ? "1" : "0",
        flexDirection:
          isMobileSize || isTabletSize
            ? "column"
            : offer.reverse
            ? "row-reverse"
            : "row",
        gap: isMobileSize || isTabletSize ? "15px" : "",
      }}
      className="our-offer-wrapper"
      id={offer.id}
    >
      {isMobileSize ? (
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
      ) : (
        <div className="offer-info">
          {isOpen ? (
            <div className="offer-info-desc">{offer.description}</div>
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
      )}
      <div className="video-wrapper">
        <video src={offer.source} autoPlay loop muted />
      </div>
    </section>
  );
};

export default OurOffers;
