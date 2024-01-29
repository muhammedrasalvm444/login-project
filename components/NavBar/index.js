import { useAuth } from "@/context/authContext";
import Link from "next/link";

const NavBar = () => {
  const { token, logout } = useAuth();

  return (
    <div className="bg-black sm:bg-black stikcy top-0 w-full z-50">
      <div className="flex items-center justify-between p-5 text-white text-md">
        <span>
          <Link href={"/"}>
            <span className="hover:text-gray-300">Test</span>
          </Link>
        </span>

        <span>
          {!token ? (
            <Link href={"/login"}>
              <span className="hover:text-gray-300">Login</span>
            </Link>
          ) : (
            <>
              <span
                className="hover:text-gray-300"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default NavBar;
