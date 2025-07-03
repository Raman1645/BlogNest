import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogIn, LogOut, User, Plus, Feather } from "lucide-react";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-sm">
      <div className="flex-1 ">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-secondary/80">
          <Feather className="size-6 text-primary/80" />
          BlogNest
        </Link>
      </div>

      <div className="flex-none gap-3">
        {!auth.user ? (
          <>
            <Link to="/login" className="btn btn-sm btn-outline gap-2">
              <LogIn className="w-4 h-4 " />
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary gap-2 bg-gradient-to-r from-primary to-secondary">
              <User className="w-4 h-4 " />
              Register
            </Link>
          </>
        ) : (
          <>

            <ThemeSelector />
            <Link to="/create" className="btn btn-sm btn-secondary gap-2">
              <Plus className="w-4 h-4" />
              Create
            </Link>

            {/* Avatar dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={auth.user.avatar} alt={auth.user.username} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="disabled text-sm font-semibold text-primary">
                  Hello, {auth.user.username}
                </li>
                <li>
                  <Link to="/profile">
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogout}>
                    <LogOut className="w-4 h-4 text-error" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
