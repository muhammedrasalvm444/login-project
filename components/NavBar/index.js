import { useAuth } from "@/context/authContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Link from "next/link";

const NavBar = () => {
  const { token } = useAuth();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <div className="bg-black sm:bg-black">
      <div className="flex items-center justify-between p-5 text-white text-md">
        <span>
          <Link href={"/"}>
            <span className="hover:text-gray-300">Test</span>
          </Link>
        </span>
        <div className="flex items-center gap-3">
          {user && <span className="hidden md:inline">{user?.name}</span>}
          <span>
            {!isAuthenticated ? (
              <>
                <Button
                  variant="primary"
                  className="hover:text-gray-300"
                  onClick={() => loginWithRedirect()}
                >
                  {" "}
                  Login
                </Button>
              </>
            ) : (
              <>
                <span
                  className="hover:text-gray-300"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Logout
                </span>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
