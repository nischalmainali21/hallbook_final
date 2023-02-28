import { useState } from "react";
import { RxDotFilled } from "react-icons/rx";

function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideStyles = {
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="group relative h-full w-full">
      <div
        style={slideStyles}
        className="h-full w-full rounded-2xl bg-cover bg-center duration-500"
      ></div>

      {/* left arrow */}
      <div className="absolute top-[50%] left-5 hidden -translate-x-3 translate-y-[-50%] cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          onClick={prevSlide}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>

      {/* right arrow */}

      <div className="absolute top-[50%] right-5 hidden translate-x-3 translate-y-[-50%] cursor-pointer rounded-full bg-black/30 p-2 text-2xl text-white group-hover:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
          onClick={nextSlide}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>

      {/* the dots */}
      <div className="mt-2 flex justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="mr-1 cursor-pointer text-xl"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
