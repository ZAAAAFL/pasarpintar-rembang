import React from "react";

const ProdukImage = () => {
  return (
    <div className="w-full px-4 md:w-[35%]">
      <div className="sticky top-0 z-50 overflow-hidden">
        <div className="relative mb-2 lg:mb-4 lg:h-2/4">
          <img
            src="https://cf.shopee.co.id/file/sg-11134201-22110-5jkefrp7l8jvd7"
            className="object-cover w-full lg:h-full rounded-md"
            alt="product img main"
          />
        </div>
        <div className="flex ">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="w-1/2 p-2 sm:w-1/4">
              <div className="block border border-sky-700 rounded">
                <img
                  src="https://cf.shopee.co.id/file/sg-11134201-22110-5pn7gzt7l8jvc4"
                  className="object-cover w-full lg:h-full rounded"
                  alt="product img main"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdukImage;
