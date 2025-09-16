import { useEffect, useState } from "react";
import AuthContext from "./authContext";
import { onAuthStateChanged, User } from "firebase/auth";
import fbAuth, { fbStore } from "~/firebase/firebaseConfig";
import AuthUser from "~/types/authUser";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { userConverter, UserDoc } from "~/types/userDoc";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // states
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // UseEffects
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      fbAuth,
      async (user: User | null) => {
        if (user) {
          const userDocRef = doc(fbStore, "users", user.uid).withConverter(
            userConverter
          );
          const userDocSnap = await getDoc(userDocRef);
          // Create user doc if not exists
          if (!userDocSnap.exists()) {
            await setDoc(userDocRef, new UserDoc(), { merge: true });
          }
        }
        setAuthUser(
          user
            ? {
                displayName: user.displayName || "Anonymous",
                email: user.email,
                uid: user.uid,
              }
            : null
        );
      }
    );
    return () => unsubscribe();
  }, []);

  // Render
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}
