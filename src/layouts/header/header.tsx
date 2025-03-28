import MainLogo from "./headersvg/logo.png";

export default function Header() {
  return (
    <>
      <header className="flex justify-between items-center mx-5 my-0 select-none">
        <div className="flex items-center">
          <img className="h-10 logo" src={MainLogo} alt="Vite logo" />
        </div>
        <div className="mt-4 mr-5 hidden md:block"></div>
        <nav className="flex justify-between items-center w-[630px] md:w-fit"></nav>
        <button className="relative w-24 h-9 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
          <span className=""></span>
          Sign In
        </button>
      </header>
    </>
  );
}
