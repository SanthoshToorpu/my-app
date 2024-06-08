'use client';
import { useState, useRef } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { LiaCircleSolid } from "react-icons/lia";

function Carousel({ slides }: { slides: any[] }) {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    setStartX(event.pageX || event.touches[0].pageX);
  };

  const handleDragEnd = (event: React.MouseEvent<HTMLDivElement>) => {
    //@ts-ignore
    const endX = event.pageX || event.changedTouches[0].pageX;
    const difference = startX - endX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) nextSlide();
      else previousSlide();
    }
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-purple-300 min-h-screen py-8">
      <button onClick={previousSlide} className="absolute left-20 z-10 p-2 rounded-full top-1/2 transform -translate-y-1/2">
        <SlArrowLeft />
      </button>

      <div
        className="overflow-hidden relative w-[80%]"
        ref={carouselRef}
        onMouseDown={handleDragStart}
        // @ts-ignore
        onTouchStart={handleDragStart}
        onMouseUp={handleDragEnd}
        // @ts-ignore
        onTouchEnd={handleDragEnd}
        style={{ userSelect: "none" }} // Prevent text selection
      >
        <div
          className="flex transition-transform ease-in-out duration-500" // Adjusted for smoother transition
          style={{
            transform: `translateX(-${current * 35}%)`,
          }}
        >
          {slides.map((s, index) => (
            <div key={index} className="flex-shrink-0 flex justify-center items-center">
              <div className="w-[30rem] bg-purple-400 rounded-xl shadow-lg flex flex-col justify-between p-10 mx-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center bg-gray-100 bg-opacity-40 p-2 pr-4 rounded-3xl">
                    <img src={s.imageUrl} alt="icon" className="w-6 h-6 rounded-full" />
                    <span className="ml-2 text-black font-medium pr-2">{s.title}</span>
                    <span className="ml-1 bg-blue-500 text-white rounded-full h-5 w-5 flex justify-center items-center text-xs">✔</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white py-">
                    <FaArrowRotateRight className="w-5 h-5 mr-3" />
                    <HiArrowUpRight className="w-5 h-5 " />
                  </div>
                </div>
                <div className="text-white text-lg py-7 font-medium">{s.text}</div>
                <div className="flex justify-between items-center">
                  <div className="text-black bg-gray-100 bg-opacity-40 rounded-full px-3 py-1 text-m flex justify-center">{s.entries} Entries <LiaCircleSolid className="w-5 h-6 ml-1"/></div>
                  <div className="text-black bg-gray-100 bg-opacity-40 rounded-full px-3 py-1 text-m">{s.seed} SEED</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-300 to-transparent opacity-80 pointer-events-none"></div>
        </div>

      <button onClick={nextSlide} className="absolute right-20 z-10 p-2 rounded-full top-1/2 transform -translate-y-1/2">
        <SlArrowRight />
      </button>

      <div className="flex justify-center w-[10rem] gap-3 p-2 rounded-3xl mt-4 bg-gray-300">
  {slides.map((_, i) => (
    <div
      onClick={() => setCurrent(i)}
      key={"circle" + i}
      className={`rounded-full w-2 h-2 cursor-pointer transition-colors duration-300 ${i === current ? "bg-white" : "bg-gray-500"}`}
    ></div>
  ))}
</div>

    </div>
  );
}

export default function App() {
  const slides = [
    {
      imageUrl: "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      text: "Deposit WBTC into Radiant and borrow & loop USDC to leverage your deposit and gain enhanced yield.",
      entries: 217,
      seed: 250,
      title: "Radiant"
    },
    {
      imageUrl: "https://i.pinimg.com/originals/51/82/ac/5182ac536727d576c78a9320ac62de30.jpg",
      text: "Deposit WBTC into Radiant and borrow & loop USDC to leverage your deposit and gain enhanced yield.",
      entries: 217,
      seed: 250,
      title: "Radiant"
    },
    {
      imageUrl: "https://wallpapercave.com/wp/wp3386769.jpg",
      text: "Deposit WBTC into Radiant and borrow & loop USDC to leverage your deposit and gain enhanced yield.",
      entries: 217,
      seed: 250,
      title: "GMX"
    },
    {
      imageUrl: "https://wallpaperaccess.com/full/809523.jpg",
      text: "Deposit WBTC into Radiant and borrow & loop USDC to leverage your deposit and gain enhanced yield.",
      entries: 217,
      seed: 250,
      title: "Radiant"
    },
    {
      imageUrl: "https://getwallpapers.com/wallpaper/full/5/c/0/606489.jpg",
      text: "Deposit WBTC into Radiant and borrow & loop USDC to leverage your deposit and gain enhanced yield.",
      entries: 217,
      seed: 250,
      title: "Radiant"
    }
  ];

  return (
    <div className="w-full m-auto pt-11 bg-purple-100 min-h-screen">
      <h1 className="text-center text-3xl font-bold py-4">DRAGGABLE SLIDER WITH PAGINATION</h1>
      <Carousel slides={slides} />
    </div>
  );
}
