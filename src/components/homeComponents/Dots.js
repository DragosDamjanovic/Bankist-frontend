import React from "react";
import styles from "../../Styles/components/slider.module.scss";

const Dots = ({ activeIndex, onclick, sliderImage }) => {
  return (
    <div className={styles.all_dots}>
      {sliderImage.map((slide, index) => (
        <span
          key={index}
          className={`${
            activeIndex === index ? styles.active_dot : styles.dot
          }`}
          onClick={() => onclick(index)}
        ></span>
      ))}
    </div>
  );
};

export default Dots;
