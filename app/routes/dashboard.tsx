import { onSnapshot, doc, DocumentReference, Unsubscribe } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal, { modalTypeOptions } from "../components/Modal";
import useAuth from "~/contexts/auth/useAuth";
import { fbStore } from "~/firebase/firebaseConfig";
import { userConverter, UserDoc } from "~/types/userDoc";


export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalType, setModalType] = useState<modalTypeOptions>("");
  const { authUser } = useAuth();
  const [userDocRef, setUserDocRef] = useState<DocumentReference<UserDoc>>();
  const [userData, setUserData] = useState<UserDoc | null>(null);

  useEffect(() => {
    let firestoreUnsub: Unsubscribe;
    if (authUser) {
      setUserDocRef(doc(fbStore, "users", authUser?.uid || "").withConverter(userConverter));
      if (userDocRef) {
        firestoreUnsub = onSnapshot(
          userDocRef,
          (doc) => {
            console.log("Current data: ", doc.data());
            setUserData(doc.data() ?? null);
          }
        );
        return () => firestoreUnsub();
      }
    } else {
      setUserDocRef(undefined);
      setUserData(null);
    }
  }, [authUser]);

  // Show loading while authUser is being determined
  if (!authUser) {
    return <div>Loading...</div>;
  }

  const openModal = (title: string, modalType: modalTypeOptions) => {
    setModalTitle(title);
    setModalOpen(true);
    setModalType(modalType);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-60">
      <h2 className="text-xl font-bold text-center mb-2">Your Verification Checklist</h2>
      <p className="text-lg text-center mb-2">Hey, {authUser.displayName}</p>
      <p className="text-center text-gray-600 mb-6">
        Complete the following steps to verify your identity. You can complete them in any order.
      </p>

      {/* User Verification Checklist */}
      <div className="w-full max-w-md mt-1 p-6 bg-white rounded-lg shadow">
        {/* Personal Details */}
        <button
          className="mb-4 p-4 w-full bg-gray-50 rounded-lg border flex items-center justify-between hover:bg-gray-100 transition"
          onClick={() => openModal("Personal Details", "personalDetails")}
        >
          <div>
            <div className="font-semibold text-indigo-700">Personal Details</div>
            <div className="text-sm text-gray-600">
              {userData?.firstName || "-"} {userData?.lastName || "-"}<br />
              {userData?.address?.street || "-"}, {userData?.address?.city || "-"}, {userData?.address?.country || "-"}
            </div>
          </div>
        </button>
        {/* Proof of ID Document */}
        <button
          className="mb-4 p-4 w-full bg-gray-50 rounded-lg border flex items-center justify-between hover:bg-gray-100 transition"
          onClick={() => openModal("Upload Document", "uploadDocument")}
        >
          <div>
            <div className="font-semibold text-indigo-700">Upload Document</div>
            <div className="text-sm text-gray-600">
              {userData?.identityDocument?.docType || "-"}
            </div>
          </div>
          <div>
            {userData?.identityDocument?.url ? (
              <a href={typeof userData.identityDocument.url === "string" ? userData.identityDocument.url : "#"} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
            ) : (
              <span className="text-gray-400">No file</span>
            )}
          </div>
        </button>
        {/* Proof of Address Document */}
        <button
          className="mb-4 p-4 w-full bg-gray-50 rounded-lg border flex items-center justify-between hover:bg-gray-100 transition"
          onClick={() => openModal("Proof of Address", "proofOfAddress")}
        >
          <div>
            <div className="font-semibold text-indigo-700">Proof of Address</div>
            <div className="text-sm text-gray-600">
              {userData?.addressProof?.docType || "-"}
            </div>
          </div>
          <div>
            {userData?.addressProof?.url ? (
              <a href={typeof userData.addressProof.url === "string" ? userData.addressProof.url : "#"} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a>
            ) : (
              <span className="text-gray-400">No file</span>
            )}
          </div>
        </button>
        {/* Liveness Check (Selfie) */}
        <button
          className="mb-4 p-4 w-full bg-gray-50 rounded-lg border flex items-center justify-between hover:bg-gray-100 transition"
          onClick={() => openModal("Liveness Check", "livenessCheck")}
        >
          <div>
            <div className="font-semibold text-indigo-700">Liveness Check</div>
            <div className="text-sm text-gray-600">
              {userData?.identityDocument?.selfieVerified ? "Completed" : "Pending"}
            </div>
          </div>
        </button>
        <button className="w-full mt-4 p-3 bg-green-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-500 transition">
          Review and Submit <span className="text-lg">→</span>
        </button>
      </div>

      <Modal open={modalOpen} onClose={closeModal} title={modalTitle} modalType={modalType} fbDocRef={userDocRef} userData={userData} />
    </div>
  );
}
