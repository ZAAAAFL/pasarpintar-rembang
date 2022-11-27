export default function NavBar({ appName }) {

  return (
    <nav className="px-3.5 py-4 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="container flex flex-wrap items-center justify-between">
        <a href="/" className="items-center">
          <span className="self-center xs:flex text-2xl font-semibold">
            <span className="mr-1.5">{appName}</span>
          </span>
        </a>
        <div className="flex md:order-2">
          <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false"
            className="md:hidden text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5 mr-1">
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-slate-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar-md-block" className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-400 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400" placeholder="Search..." />
          </div>
          <button type="button" data-collapse-toggle="navbar-menu" aria-controls="navbar-menu" aria-expanded="false"
            className="md:hidden text-slate-800 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-md text-sm p-2.5">
            <span className="sr-only">Open menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div id="navbar-search" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-slate-800" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="search-navbar-md-hidden" className="block w-full p-2 pl-10 text-sm text-slate-900 border border-slate-400 rounded-md bg-slate-50 focus:ring-blue-400 focus:border-blue-400" placeholder="Search..." />
          </div>
        </div>
        <div id="navbar-menu" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col gap-y-1 p-4 mt-4 border border-slate-100 rounded-md bg-slate-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <a href="/" className={`block py-2 pl-3 pr-4 ${route().current('index') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-600' : 'text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600'} rounded md:p-0`}>Home</a>
            </li>
            <li>
              <a href="/produk" className={`block py-2 pl-3 pr-4 ${route().current('produk') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-600' : 'text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600'} rounded md:p-0`}>Produk</a>
            </li>
            <li>
              <a href="/login" className={`block py-2 pl-3 pr-4 ${route().current('login') ? 'text-white bg-blue-600 md:bg-transparent md:text-blue-600' : 'text-slate-700 hover:bg-slate-100 md:hover:bg-transparent md:hover:text-blue-600'} rounded md:p-0`}>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
