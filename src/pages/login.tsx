import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="text-center py-4 p-3">
      <h2>Sign in with Google to Contnue</h2>
      <button onClick={signInWithGoogle} className="btn btn-sm btn-info">
        Sign In With Google
      </button>
    </div>
  );
};
