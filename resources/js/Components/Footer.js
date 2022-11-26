export default function Footer({ appName }) {
  return (
    <footer className="p-4 bg-white rounded-t-lg shadow md:px-4 md:py-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="/" className="flex items-center mb-4 sm:mb-0">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            {appName}
          </span>
        </a>
        <ul className="flex flex-wrap items-center mb-0 sm:mb-4 text-sm text-slate-600">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Tentang</a>
          </li>
        </ul>
      </div>
      <hr className="my-4 border-slate-400 sm:mx-auto lg:my-6" />
      <span className="block text-sm text-slate-700 sm:text-center">&copy; 2022 <a href="#" className="hover:underline">SofDev</a>. All Rights Reserved</span>
    </footer>
  );
}
