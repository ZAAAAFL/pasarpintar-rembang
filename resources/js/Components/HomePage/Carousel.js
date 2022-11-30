import React from "react";

const Carousel = () => {
  return (
    <div className="container mt-2">
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-1 max-w-5xl mx-auto">
        <div
          id="animation-carousel"
          className="relative col-span-1 lg:col-span-3 lg:row-span-4"
          data-carousel="static"
        >
          <div className="relative w-full h-56 overflow-hidden lg:h-full">
            <div
              className="duration-500 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10 hidden"
              data-carousel-item=""
            >
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-500 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10 hidden"
              data-carousel-item=""
            >
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-500 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10"
              data-carousel-item=""
            >
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-500 ease-linear absolute inset-0 transition-all transform translate-x-0 z-20"
              data-carousel-item=""
            >
              <img
                src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="hidden lg:block lg:row-span-2">
          <div
            className="md:h-32 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://flowbite.com/docs/images/carousel/carousel-1.svg)",
            }}
          />
        </div>
        <div className="hidden lg:block lg:row-span-2">
          <div
            className="md:h-32 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://flowbite.com/docs/images/carousel/carousel-1.svg)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
