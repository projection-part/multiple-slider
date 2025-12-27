import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

export const MultiSlider = ({
  children,
  autoplay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  infinite = true,
  slidesToShow = 1,
  prevArrow,
  nextArrow,
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;

  const [index, setIndex] = useState(infinite ? slidesToShow : 0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const trackRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  /* ---------------- Infinite Loop Setup ---------------- */
  const extendedSlides = infinite
    ? [
        ...slides.slice(-slidesToShow),
        ...slides,
        ...slides.slice(0, slidesToShow),
      ]
    : slides;

  const maxIndex = infinite
    ? totalSlides + slidesToShow
    : totalSlides - slidesToShow;

  /* ---------------- Navigation ---------------- */
  const nextSlide = () => {
    if (!infinite && index >= maxIndex) return;
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!infinite && index <= 0) return;
    setIndex((prev) => prev - 1);
  };

  /* ---------------- Autoplay ---------------- */
  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval]);

  /* ---------------- Infinite Loop Reset ---------------- */
  useEffect(() => {
    if (!infinite) return;

    if (index === totalSlides + slidesToShow) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(slidesToShow);
      }, 300);
    }

    if (index === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(totalSlides);
      }, 300);
    }
  }, [index]);

  useEffect(() => {
    if (!isTransitioning) {
      requestAnimationFrame(() => setIsTransitioning(true));
    }
  }, [isTransitioning]);

  /* ---------------- Swipe Support ---------------- */
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchEnd = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();

    isDragging.current = false;
  };

  /* ---------------- Keyboard Support ---------------- */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ---------------- Arrow Disable Logic ---------------- */
  const disablePrev = !infinite && index === 0;
  const disableNext = !infinite && index >= maxIndex;

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Arrows */}
      {showArrows && (
        <>
          <button
            className="arrow left"
            onClick={prevSlide}
            disabled={disablePrev}
          >
            {prevArrow || "❮"}
          </button>

          <button
            className="arrow right"
            onClick={nextSlide}
            disabled={disableNext}
          >
            {nextArrow || "❯"}
          </button>
        </>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className="slider-track"
        style={{
          transform: `translateX(-${(index * 100) / slidesToShow}%)`,
          transition: isTransitioning ? "transform 0.4s ease" : "none",
        }}
      >
        {extendedSlides.map((child, i) => (
          <div
            className="slide"
            key={i}
            style={{ width: `${100 / slidesToShow}%` }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dots */}
      {showDots && (
        <div className="dots">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <span
              key={i}
              className={`dot ${
                i === (index - slidesToShow + totalSlides) % totalSlides
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setIndex(infinite ? i + slidesToShow : i)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

