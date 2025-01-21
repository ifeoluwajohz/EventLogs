import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { carouselData } from "../data/CarouselData";
import {useNavigate} from "react-router-dom"

const Carousel: React.FC = () => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const handleImageClick = (location: string) => {
    navigate(`/EventsPage/${location}`);
  };

  return (
    <div className="w-full px-4 py-10">
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div key={index} className="p-2">
            <div className="rounded-lg overflow-hidden bg-white shadow-md cursor-pointer" onClick={() => handleImageClick(item.title)}>
              <img
                src={item.image || "/images/fallback.jpg"}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.locations} locations</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
