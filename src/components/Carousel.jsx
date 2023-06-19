import React, { useEffect } from "react";
import { longList } from "../data";
import { useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    let sliderId = setInterval(() => onSlideChange("next"), 2000);
    return () => clearInterval(sliderId);
  }, [currentSlide]);

  const onSlideChange = (state) => {
    setCurrentSlide((prevSlide) => {
      let updateSlide;
      if (state === "prev") {
        updateSlide = prevSlide - 1;
        if (updateSlide < 0) {
          updateSlide = people.length - 1;
        }
      } else {
        updateSlide = (prevSlide + 1) % (people.length - 1);
      }
      return updateSlide;
    });
  };
  return (
    <section className="slider-container">
      {people.map((person, i) => {
        const { id, image, name, title, quote } = person;
        return (
          <article
            className="slide"
            style={{
              transform: `translateX(${100 * (i - currentSlide)}%)`,
              opacity: personIndex === currentPerson ? 1 : 0,
              visibility: personIndex === currentPerson ? "visible" : "hidden",
            }}
            key={id}
          >
            <img src={image} alt={name} className="person-img" />
            <h3 className="name">{name}</h3>
            <span className="title">{title}</span>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon"></FaQuoteRight>
          </article>
        );
      })}

      <button
        type="button"
        className="prev"
        onClick={() => onSlideChange("prev")}
      >
        <BiChevronLeft></BiChevronLeft>
      </button>
      <button
        type="button"
        className="next"
        onClick={() => onSlideChange("next")}
      >
        <BiChevronRight></BiChevronRight>
      </button>
    </section>
  );
};

export default Carousel;
