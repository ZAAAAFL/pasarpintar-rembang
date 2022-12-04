export default function Footer({ appName }) {
  return (
    <footer className="bg-white mt-4">
      <div className="h-60"></div>
      <div className="bg-slate-200">
        <div className="container px-3.5 py-4 flex items-center justify-center border-t-2 border-slate-500">
          <span className="text-sm text-slate-700 sm:text-center">
            {appName} &copy; 2022{" "}
            <a
              className="hover:underline hover:cursor-pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              SoftDev
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
}
