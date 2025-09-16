import { useState } from "react";
import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import fbAuth from "~/firebase/firebaseConfig";
import GoogleIcon from "./google-icon.svg";
import AnonIcon from "./anon-icon.svg";

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(fbAuth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login. Please try again.");
      console.error("Login error:", err);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(fbAuth);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to login anonymously. Please try again.");
      console.error("Anonymous login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`mb-4 ${styles.loginButton}`}
        onClick={handleGoogleLogin}>
        <img
          src={GoogleIcon}
          alt="Google icon"
          className="inline-block w-5 h-5 mr-2 align-middle"
        />
        Continue with Google
      </button>

      <button
        className={`mb-2 ${styles.loginButton}`}
        onClick={handleAnonymousLogin}>
        <img
          src={AnonIcon}
          alt="anonymous icon"
          className="inline-block w-5 h-5 mr-2 align-middle"
        />
        Login Anonymously
      </button>

      <p className="text-center text-sm text-gray-500 mt-2 max-w-xs">
        Your data will be deleted after 30 days.
      </p>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
