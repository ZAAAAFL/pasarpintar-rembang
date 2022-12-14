import React from "react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";

export default function Cart(props) {
  // const props = usePage().props;

  return (
    <>
      <header>
        <NavBar appName={props.app.name} user={props.auth.user} />
        <Head title={props.title} />
      </header>
      {/* {children} */}
      <div className="h-screen">

        {/* mobile view */}
        <div className="md:hidden">
          <div className="p-5 bg-white">{props.title}</div>

          <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
            <div className="m-2">
              <Input type="checkbox"></Input>
              <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
            </div>
            <div className="m-2">
              <span className="mx-2">Laptop Acer</span><br></br>
              <div className="mx-2">1 x 20.000 = Rp. 20.000</div>
              <div className="flex mx-2">
                <Input value="1" className="w-14 h-8 text-center"></Input>
                <Link className="bg-yellow-300 text-black p-1 rounded-md ml-3">Update</Link>
                <Link className="bg-red-600 text-white p-1 rounded-md ml-3">Delete</Link>
              </div>
            </div>
          </div>
          <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
            <div className="m-2">
              <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
            </div>
            <div className="m-2">
              <span className="mx-2">Laptop Acer</span><br></br>
              <div className="mx-2">1 x 20.000 = Rp. 20.000</div>
              <div className="flex mx-2">
                <Input value="1" className="w-14 h-8 text-center"></Input>
                <Link className="bg-yellow-300 text-black p-1 rounded-md ml-3">Update</Link>
                <Link className="bg-red-600 text-white p-1 rounded-md ml-3">Delete</Link>
              </div>
            </div>
          </div>
          <div className="flex m-3 bg-white border-b hover:bg-slate-100 my-2">
            <div className="m-2">
              <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" className="w-20 h-20 rounded-md" />
            </div>
            <div className="m-2">
              <span className="mx-2">Laptop Acer</span><br></br>
              <div className="mx-2">1 x 20.000 = Rp. 20.000</div>
              <div className="flex mx-2">
                <Input value="1" className="w-14 h-8 text-center"></Input>
                <Link className="bg-yellow-300 text-black p-1 rounded-md ml-3">Update</Link>
                <Link className="bg-red-600 text-white p-1 rounded-md ml-3">Delete</Link>
              </div>
            </div>
          </div>

          <div className="p-4 text-center text-bold bg-white hover:bg-slate-100 text-sky-600">Total: Rp. 60.000</div>
          <div className="grid grid-cols-2 mx-auto mt-4">
            <div className="mx-auto"><Link className="bg-blue-600 text-white p-2 rounded-md text-center">Belanja lagi</Link></div>
            <div className="mx-auto"><Link className="bg-green-500 p-2 text-white rounded-md text-center">Checkout</Link></div>
          </div>
        </div>
        {/* end mobile view */}

        {/* large view and medium view */}
        <div className="space-y-3 hidden md:block">
          <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">{props.title}</h1>
                  <h2 className="font-semibold text-2xl">3 Items</h2>
                </div>
                <div className="flex mt-10 mb-5">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Price</h3>
                  <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                </div>
                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <img className="h-24" src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs">Hapus</a>
                    </div>
                  </div>
                  <div className="flex justify-center w-1/5">
                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>

                    <Input className="mx-2 border text-center w-8" type="text" value="1" />

                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                      <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                    </svg>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
                  <span className="text-center w-1/5 font-semibold text-sm">$400.00</span>
                </div>

                <Link href={'/'} className="flex font-semibold text-indigo-600 text-sm mt-10">

                  <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                  Continue Shopping
                </Link>
              </div>

              <div id="summary" className="w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">Items 3</span>
                  <span className="font-semibold text-sm">590$</span>
                </div>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>$600</span>
                  </div>
                  <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">Checkout</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer appName={props.app.name} />
    </>
  );
}
