import React, { useEffect, useState } from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import sliderImages from "./sliderImages";
import styles from "../../Styles/components/slider.module.scss";

const Slider = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const len = sliderImages.length - 1;
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <div className={styles.slider_container}>
      <SliderContent activeIndex={activeIndex} sliderImage={sliderImages} />

      <Dots
        activeIndex={activeIndex}
        sliderImage={sliderImages}
        onclick={(activeIndex) => setActiveIndex(activeIndex)}
      />
    </div>
  );
};

export default Slider;
