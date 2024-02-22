import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import { CircleUser } from "lucide-react";

function NavBar() {
  return (
    <nav className="flex flex-row items-center justify-between p-2 md:p-8 bg-white border-white shadow-md shadow-primary">
      <div className="flex-shrink-0">
        <Link to={ROUTES.dashboard}>
          <img src="/logos/logo-whitemex.jpg" className="w-24 h-20" alt="logo" />
        </Link>
      </div>
      <div className="flex items-center justify-center px-5">
        <span className="text-lg text-primary md:text-2xl font-bold text-center">Gerencie suas transações com a WhiteMex</span>
      </div>
      <div className="flex-shrink-0">
      <Link to={ROUTES.me}>
        <CircleUser size={40} className="text-primary" />
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
