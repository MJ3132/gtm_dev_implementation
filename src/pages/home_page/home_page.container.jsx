import React, { useEffect } from "react";
import "./home_page.styles.scss";

import HeroBanner from "../../assets/images/tamanna-rumee-mIqyYpSNq3o-unsplash_main_banner.jpg";
import PromoShoes from "../../assets/images/promotion_athletic_shoes.jpg";
import PromoBackpacks from "../../assets/images/promotion_backpacks.jpg";
import PromoVacuums from "../../assets/images/promotion_vaccums.jpg";
import PromoPans from "../../assets/images/promotion_pans.jpg";
import PromoWatches from "../../assets/images/promotion_watches.jpg";
import PromoCouches from "../../assets/images/promotion_couches.jpg";
import PromoDinnerSets from "../../assets/images/promotion_dinner_sets.jpg";

import Button from "../../components/Button/Button.component";
import Banner from "../../components/Banner/Banner.component";
import Link from "@mui/material/Link";

import TagManager from "react-gtm-module";

const Homepage = () => {
  const url =
    process.env.NODE_ENV === "development"
      ? window.location.href + "/"
      : window.location.href;

  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "pageview",
        page: {
          path: "/homepage",
          pageType: "homePage",
        },
      },
    });
  }, []);

  return (
    <>
      <div className="page_section homepage_container">
        <div
          promo="black friday sale"
          creative="50% hero banner"
          className="banner_container"
        >
          <Link href={url + "catalogue"} underline="none">
            <Banner bannerImage={HeroBanner} />
          </Link>
        </div>
        <div className="promotions_container">
          <div
            promo="2 x 1 blk friday shoes"
            creative="red nike shoes"
            className="promotion_slot"
          >
            <Link href={url + "catalogue"} underline="none">
              <Banner bannerImage={PromoShoes} />
              <div className="promotion_title">
                <h1>Shoes</h1>
              </div>
              <Button>Shop Now</Button>
            </Link>
          </div>
          <div
            promo="25% off blk friday backpacks"
            creative="blue backpack"
            className="promotion_slot"
          >
            <Link href={url + "catalogue"} underline="none">
              <Banner bannerImage={PromoBackpacks} />
              <div className="promotion_title">
                <h1>Backpacks</h1>
              </div>
              <Button>Shop Now</Button>
            </Link>
          </div>
          <div
            promo="free blk friday couch shipping"
            creative="beige couch"
            className="promotion_slot"
          >
            <Link href={url + "catalogue"} underline="none">
              <Banner bannerImage={PromoCouches} />
              <div className="promotion_title">
                <h1>Couches</h1>
              </div>
              <Button>Shop Now</Button>
            </Link>
          </div>
          <div
            promo="30% off blk friday dinner sets"
            creative="grey dinner set"
            className="promotion_slot"
          >
            <Link href={url + "catalogue"} underline="none">
              <Banner bannerImage={PromoDinnerSets} />
              <div className="promotion_title">
                <h1>Dinner Sets</h1>
              </div>
              <Button>Shop Now</Button>
            </Link>
          </div>
          <div
            promo="2 X 1 blk friday watches"
            creative="rolex watch"
            className="promotion_slot"
          >
            <Link href={url + "catalogue"} underline="none">
              <Banner bannerImage={PromoWatches} />
              <div className="promotion_title">
                <h1>Watches</h1>
              </div>
              <Button>Shop Now</Button>
            </Link>
          </div>
        </div>

        <div className="media_video_container">
          <h1>Checkout Our New Camera Addition!</h1>
          <iframe
            src="https://www.youtube.com/embed/3bCpnTD3Tt8?start=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <section className="section_about_product">
          <div className="product_description_container">
            <div className="product_description_image_container">
              <Link href={url + "catalogue"} underline="none">
                <img src={PromoVacuums} alt="promo vacuums" />
              </Link>
            </div>
            <div
              promo="2 x 1 blk friday vaccums"
              creative="red vaccum"
              className="product_description"
            >
              <h2 className="heading-secondary">2 x 1 Robot Vaccums!</h2>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit ab doloribus quidem quo omnis fugit similique amet
                adipisci repellat quasi itaque nulla fuga, esse hic qui maxime
                unde quibusdam doloremque?
              </p>
            </div>
          </div>
          <div className="product_description_container">
            <div
              promo="50% off blk friday pans"
              creative="masterchef pans"
              className="product_description"
            >
              <h2 className="heading-secondary">50% Off Pans This Week!</h2>
              <p className="paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo, eos? Ipsam soluta, natus neque cumque nesciunt quia
                esse delectus tempore officiis assumenda atque culpa dolorum
                facilis omnis labore nam quae.
              </p>
            </div>
            <div className="product_description_image_container">
              <Link href={url + "catalogue"} underline="none">
                <img src={PromoPans} alt="promo pans" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Homepage;
