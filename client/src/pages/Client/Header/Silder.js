import React from "react";
import { grImage } from "../../../Import/Images";
import './styles.scss';
export const Slider = () => {
    return (
        <>
            <section class="section-home-banner container" style={{ overflow: 'hidden' }}>
            <div class="row home-banner__row">
              <div class="col-sm-8 home-banner__left">
                <div class="owl-carousel" id="banner-carousel">
                    <div class="item"><a href="#"><img src={grImage.imageBanner} alt="undefined" /></a></div>
                </div>
              </div>
              <div class="col-sm-4 d-none d-sm-block home-banner__right">
                <a class="home-banner__right-img" href="#">
                    <img class="w-100" src={grImage.imageBanner} alt="image-home-banner-2" />
                </a>
                <a class="home-banner__right-img" href="#">
                    <img class="w-100" src={grImage.imageBanner3} alt="image-home-banner-3" />
                    </a>
              </div>
            </div>
          </section>
        </>
    )
}