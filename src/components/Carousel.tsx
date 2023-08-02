import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";

const Carousel = ({ images }: any) => {
  const [currSlide, setCurrSlide] = useState(0);
  function prevSlide() {
    setCurrSlide((currSlide) =>
      currSlide === 0 ? images.length - 1 : currSlide - 1
    );
  }
  function nextSlide() {
    setCurrSlide((currSlide) =>
      currSlide === images.length - 1 ? 0 : currSlide + 1
    );
  }

  return (
    <div className="relative w-full ">
      <div
        className="flex relative w-full duration-700 "
        style={{ transform: `translateX(-${currSlide * 100}%)` }}
      >
        {images.map((image: any, i: number) => (
          <img
            key={i}
            src={image}
            alt="images"
            style={{ aspectRatio: 1, objectFit: "cover" }}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <div className="text-black">
          <KeyboardArrowLeftIcon
            onClick={prevSlide}
            className="cursor-pointer bg-white rounded-xl"
          />
        </div>
        <div className="text-black">
          <KeyboardArrowRightIcon
            onClick={nextSlide}
            className="cursor-pointer bg-white rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
