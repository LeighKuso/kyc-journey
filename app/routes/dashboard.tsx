import { Unsubscribe } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MultiStepForm from "~/components/multi-step-form";
import useAuth from "~/contexts/auth/useAuth";
import { fbStore } from "~/firebase/firebaseConfig";
import { userConverter, UserDoc } from "~/types/userDoc";

export default function Dashboard() {
  const { authUser } = useAuth();
  const [userData, setUserData] = useState<UserDoc | null>(null);

  useEffect(() => {
    let firestoreUnsub: Unsubscribe;
    if (authUser) {
      firestoreUnsub = onSnapshot(
        doc(fbStore, "users", authUser?.uid || "").withConverter(userConverter),
        (doc) => {
          console.log("Current data: ", doc.data());
          setUserData(doc.data() ?? null);
        }
      );
      return () => firestoreUnsub();
    }
  }, [authUser]);

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-60 bg-gray-200">
      <div>
        <div>Display Name: {authUser.displayName}</div>
      </div>
      <div className="text-xl font-semibold mt-4">Dashboard</div>
      {/* Show user's data */}
      <br />
      <MultiStepForm />
    </div>
  );
}
