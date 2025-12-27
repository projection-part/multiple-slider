import React, { useState, useEffect } from "react";
import "../multiSlider/slider.css";

export const MultipleSlider = ({
  children,
  slidesToShow = 3,
  autoplay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  prevArrow,
  nextArrow,
}) => {
  const [index, setIndex] = useState(0);
  const total = children.length;
  const maxIndex = total - slidesToShow;

  const next = () => {
    setIndex((prev) => {
      if (prev >= maxIndex) return infinite ? 0 : prev;
      return prev + 1;
    });
  };

  const prev = () => {
    setIndex((prev) => {
      if (prev <= 0) return infinite ? maxIndex : prev;
      return prev - 1;
    });
  };

  /* ---------- AUTOPLAY ---------- */
  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, maxIndex]);


return (
  <div className="ms-root">
    <div className="ms-wrapper">
      {showArrows && (
        <button
          className="ms-arrow"
          onClick={prev}
          disabled={!infinite && index === 0}
        >
          {prevArrow || "❮"}
        </button>
      )}

      <div className="ms-viewport">
        <div
          className="ms-track"
          style={{
            transform: `translateX(-${index * (100 / slidesToShow)}%)`,
          }}
        >
          {children.map((child, i) => (
            <div
              className="ms-slide"
              key={i}
              style={{ width: `${100 / slidesToShow}%` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows && (
        <button
          className="ms-arrow"
          onClick={next}
          disabled={!infinite && index === maxIndex}
        >
          {nextArrow || "❯"}
        </button>
      )}
    </div>

    {showDots && (
      <div className="ms-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <span
            key={i}
            className={`ms-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    )}
  </div>
);


}



