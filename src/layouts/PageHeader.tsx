import { Menu } from "lucide-react";
import MainLogo from "./headersvg/logo.png";

export function PageHeader() {
  return (
    <>
      <div className="flex items-center mx-5 my-0 select-none">
        <button>
          <Menu className="h-27"></Menu>
        </button>
        <img className="h-10" src={MainLogo} alt="Vite logo" />
      </div>
    </>
  );
}
