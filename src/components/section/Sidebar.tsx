import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Sidebar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="card text-center">
      {user && <img src={user?.photoURL || ""} width="100" height="100" className="card-img-top" alt="..." />}{" "}
      <div className="card-title">
        <p className="card-text">{user ? user?.displayName : "Welcome"}</p>
      </div>
      <div className="card-body">
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  );
};
