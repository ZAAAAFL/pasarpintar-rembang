import Main from "@/Layouts/Main";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

const Pencarian = ({ query, hasil }) => {
  console.log(hasil);
  return (
    <>
      <Head title={`${query} - pencarian`} />
      <div className="container mt-4">
        <div className="bg-white border-2 border-sky-900 rounded-lg overflow-hidden">
          <div className="flex flex-wrap border-b-2 border-slate-600 -mb-px px-4 text-sm font-medium text-center text-slate-700">
            <div className="inline-flex p-3 rounded-t-lg">
              <h2 className="text-slate-700 font-medium text-lg">
                {`Hasil pencarian : ${query}`}
              </h2>
            </div>
          </div>
          <div className="relative p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 justify-items-center overflow-y-auto scrollbar-hide">
              {hasil.map((data, i) => (
                <div
                  key={i}
                  className="w-full bg-white border-2 border-slate-600 rounded-md overflow-hidden"
                >
                  <Link href={`${data.toko.slugToko}/${data.slugProduk}`}>
                    <div className="relative flex flex-col overflow-visible w-full h-full bg-white rounded-md">
                      <img
                        className="shrink-0 bg-cover bg-center w-full p-2 max-h-44"
                        src="https://cf.shopee.co.id/file/88063c6dfd1dea9848c17b33205b71b8_tn"
                        alt="productImage"
                      />
                      <div className="flex flex-col flex-[1_0_auto] px-2 py-2.5 overflow-hidden">
                        <div className="flex flex-col flex-[1_0_auto]">
                          <h5 className="text-sm font-semibold tracking-tight text-slate-700 line-clamp-2">
                            {data.namaProduk}
                          </h5>
                        </div>
                        <div>
                          <span className="text-lg font-bold">
                            RP{data.hrgJual}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 pt-1">
                              {`${data.terjual} terjual`}
                            </span>
                          </div>
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
    </>
  );
};

Pencarian.layout = (page) => <Main children={page} />;

export default Pencarian;
