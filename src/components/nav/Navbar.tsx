import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-info mx-0 px-5">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {!user ? (
                <Link className="nav-link active" aria-current="page" to="/login">
                  Login
                </Link>
              ) : (
                <Link className="nav-link" to="/create-post">
                  Create Post
                </Link>
              )}
            </div>
            <div className="ms-auto navbar-nav">
              {user && (
                <div className="p-1">
                  <p>
                    {user?.displayName}
                    <img src={user?.photoURL || ""} className="ps-2 pe-2 rounded-circle" width="50" height="30" alt=".." />
                    <button onClick={signUserOut} className="btn ps-2 btn-sm bg-secondary text-white">
                      Log Out
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
