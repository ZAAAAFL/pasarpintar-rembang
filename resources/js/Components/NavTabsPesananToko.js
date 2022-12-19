import { Link } from "@inertiajs/inertia-react";

export default function NavTabsPesananToko() {
  return (
    <>
      <ul className="flex flex-wrap text-md text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 font-bold">
        <li className="mr-2">
          <Link href="/toko-pesanan" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Pesanan baru</Link>
        </li>
        <li className="mr-2">
          <Link href="/toko-pesanan/konfirmasi-bayar" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Konfirmasi Bayar</Link>
        </li>
        <li className="mr-2">
          <Link href="/toko-pesanan/dikemas" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Dikemas</Link>
        </li>
        <li className="mr-2">
          <Link href="/toko-pesanan/dikirim" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Di kirim</Link>
        </li>
        <li className="mr-2">
          <Link href="/toko-pesanan/sampai" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Sampai</Link>
        </li>
      </ul>

    </>
  )
}
