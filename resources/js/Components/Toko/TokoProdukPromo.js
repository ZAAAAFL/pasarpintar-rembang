import React from "react";
import { FireIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";

const TokoProdukPromo = () => {
  return (
    <div className="container">
      <div className="bg-white border-2 border-sky-900 rounded-lg overflow-hidden">
        <div className="flex flex-wrap border-b-2 border-slate-600 -mb-px px-4 text-sm font-medium text-center text-slate-700">
          <div className="inline-flex items-center p-3 rounded-t-lg">
            <FireIcon
              className="mr-2 w-5 h-5 text-red-500"
              aria-hidden="true"
            />
            <h2 className="text-slate-700 font-medium text-lg">Promo</h2>
          </div>
        </div>
        <div className="relative p-2 overflow-auto">
          <div className="relative w-full pb-2 flex gap-3 snap-x snap-mandatory overflow-x-auto scrollbar">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="snap-start snap-always shrink-0">
                <Link href="#">
                  <div className="w-full max-w-[8rem] sm:w-max-[9rem] md:max-w-[10rem] lg:max-w-[11rem] max-h-max bg-white rounded-md">
                    <img
                      className="shrink-0 bg-cover bg-center w-full p-2 max-h-44"
                      src="https://cf.shopee.co.id/file/88063c6dfd1dea9848c17b33205b71b8_tn"
                      alt="productImage"
                    />
                    <div className="px-2 py-2.5">
                      <h5 className="text-sm font-semibold tracking-tight text-slate-700 line-clamp-2">
                        Apple Watch Series wow keren banget cuy coba aja deh
                      </h5>
                      <span className="text-lg font-bold">RP30.000</span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 pt-1">
                          1,49rb+ terjual
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokoProdukPromo;
