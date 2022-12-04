import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const ProdukLaris = () => {
  return (
    <div className="container">
      <div className="bg-sky-900 border-2 border-sky-800 rounded-lg overflow-hidden">
        <div className="relative flex justify-start align-baseline px-4 bg-sky-400">
          <h2 className="mt-3 pt-2 px-4 rounded-t-md bg-sky-900 text-base text-white">
            Produk Terlaris
          </h2>
        </div>
        <div className="relative p-2 overflow-auto">
          <div className="relative w-full pb-2 flex gap-2 snap-x snap-mandatory overflow-x-auto scrollbar">
            {Array.from({ length: 24 }, (_, i) => (
              <div key={i} className="snap-start snap-always shrink-0">
                <div className="w-full max-w-[8rem] bg-white rounded-lg">
                  <Link href="#">
                    <img
                      className="shrink-0 bg-cover bg-center w-full p-3 rounded-t-lg max-h-72"
                      src="https://flowbite.com/docs/images/products/apple-watch.png"
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

export default ProdukLaris;