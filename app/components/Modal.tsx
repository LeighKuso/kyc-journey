import React from "react";
import LivenessCheck from "./verificationSteps/LivenessCheck";
import PersonalDetailsForm from "./verificationSteps/PersonalDetailsForm";
import { DocumentReference, setDoc } from "firebase/firestore";
import { UserDoc } from "~/types/userDoc";
import CaptureDocument from "./verificationSteps/CaptureDocument";
import { ref, uploadBytes } from "firebase/storage";
import { fbFileStore } from "~/firebase/firebaseConfig";

export type modalTypeOptions = "" | "personalDetails" | "uploadDocument" | "livenessCheck" | "proofOfAddress";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    modalType: modalTypeOptions;
    fbDocRef: DocumentReference<UserDoc> | undefined;
    userData?: UserDoc | null;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, modalType, fbDocRef, userData }) => {
    if (!open) return null;

    function handleDocumentUpload(file: any): void {
        if (file) {
            console.log(file);

            const folderRef = ref(fbFileStore, fbDocRef?.id || "defaultFolder");
            uploadBytes(folderRef, file).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                console.log(snapshot);
                // updateFireStore();
            }).catch((error) => {
                console.error("Error uploading file:", error);
            });
        }
    }

    function handleAddressProofTypeSelect(type: string, uploadingDocument: string): void {
        if (fbDocRef) {
            setDoc(fbDocRef, new UserDoc({ [uploadingDocument]: { docType: type } }), { merge: true });
        }
    }

    const handleIdDocumentTypeSelect = (type: string, uploadingDocument: string) => {
        if (fbDocRef) {
            setDoc(fbDocRef, new UserDoc({ [uploadingDocument]: { docType: type } }), { merge: true });
        }
    };

    return (
        <div className="fixed px-4 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg max-w-md max-h-[80vh] w-full p-6 relative">
                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>
                <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
                <div>
                    {modalType === "personalDetails" && (<PersonalDetailsForm initialData={userData} docRef={fbDocRef} />)}
                    {modalType === "uploadDocument" && (<CaptureDocument onCapture={handleDocumentUpload} uploadingDocument={"identityDocument"} onDoctypeSelect={handleIdDocumentTypeSelect} />)}
                    {modalType === "proofOfAddress" && (<CaptureDocument onCapture={handleDocumentUpload} uploadingDocument={"addressProof"} onDoctypeSelect={handleAddressProofTypeSelect} />)}
                    {modalType === "livenessCheck" && <LivenessCheck onStart={function (): void { }} />}
                </div>
            </div>
        </div>
    );
};

export default Modal;
