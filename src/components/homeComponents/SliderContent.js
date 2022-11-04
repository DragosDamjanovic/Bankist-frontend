import React from "react";
import styles from "../../Styles/components/slider.module.scss";

const SliderContent = ({ activeIndex, sliderImage }) => {
  return (
    <>
      {sliderImage.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? styles.active : styles.inactive}
        >
          <img className={styles.slide_image} src={slide.urls} alt="" />
          <div className="headline">
            <h1 className={styles.slide_title}>{slide.title}</h1>
            <p className={styles.slide_text}>{slide.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default SliderContent;
