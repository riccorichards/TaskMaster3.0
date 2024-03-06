import inpto_products from "../../const";
import Utils from "../../utils/Utils";
import Header from "../header/Header";
import "./Intro.scss";

const Intro = () => {
  const test =
    "https://i.pinimg.com/564x/92/f0/d2/92f0d2e8dd34c9ffe422bcfc826c3d81.jpg";

  return (
    <div className="intro-wrapper">
      <Header />
      <div className="intro-title">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          <h1>
            <span>
              Master Your <span style={{ color: "#f07043" }}>Time</span>,
            </span>
            <span>
              Master Your <span style={{ color: "#f07043" }}>Life</span>
            </span>
          </h1>
          <p>
            Elevate your productivity with our bespoke time management tools,
            designed to turn your goals into reality. Visualize your daily
            achievements through our intuitive dashboard, and embrace a life
            where every second counts towards your success.
          </p>
          <button>Begin Your Journey</button>
        </div>
      </div>
      <div className="product-showcases">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            alignItems: "center",
          }}
        >
          <div className="product-wrapper">
            <img src={test} alt="test" />
          </div>
          <div className="products">
            {inpto_products.map((product) => (
              <div className="product">
                <product.icon />
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                  onClick={() => Utils.scrollToComponent(product.title)}
                >
                  <h3>{product.title}</h3>
                  <p>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
