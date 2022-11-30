export default function Footer({ appName }) {
  return (
    <footer className="bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
      <div className="h-60"></div>
      <div className="bg-slate-200">
        <div className="container px-3.5 py-4 flex items-center justify-center border-t-2 border-slate-500">
          <span className="text-sm text-slate-700 sm:text-center">
            {appName} &copy; 2022 <a className="hover:underline">SoftDev</a>.
          </span>
        </div>
      </div>
    </footer>
  );
}
