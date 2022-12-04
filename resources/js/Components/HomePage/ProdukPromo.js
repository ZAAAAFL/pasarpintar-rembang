import { FireIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const ProdukPromo = () => {
  return (
    <div className="container">
      <div className="bg-white border-2 border-sky-900 rounded-lg overflow-hidden">
        <div className="flex flex-wrap border-b-2 border-slate-600 -mb-px text-sm font-medium text-center text-slate-700">
          <div className="inline-flex p-3 rounded-t-lg active group">
            <FireIcon
              className="mr-2 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <h2 className="text-slate-700 font-medium text-base">Promo</h2>
          </div>
        </div>
        <div className="relative p-2 overflow-auto">
          <div className="relative w-full pb-2 flex gap-3 snap-x snap-mandatory overflow-x-auto scrollbar">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="snap-start snap-always shrink-0">
                <div className="w-full max-w-[8rem] sm:w-max-[9rem] md:max-w-[10rem] lg:max-w-[11rem] max-h-max bg-white rounded-md">
                  <Link href="#">
                    <img
                      className="shrink-0 bg-cover bg-center w-full p-2 max-h-44"
                      src="https://cf.shopee.co.id/file/88063c6dfd1dea9848c17b33205b71b8_tn"
                      alt="productImage"
                    />
                  </Link>
                  <div className="px-2 py-2.5">
                    <Link href="#">
                      <h5 className="text-sm font-semibold tracking-tight text-slate-700 line-clamp-3">
                        Apple Watch Series wow keren banget cuy coba aja deh
                      </h5>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 pt-1">
                        1,49rb+ terjual
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdukPromo;
