import React, { useEffect, useRef, useState } from "react";
import SelectIdentityDocument from "./SelectIdentityDocument";
import { UserDoc } from "~/types/userDoc";
import { IdentityDocType, uploadingDocument } from "~/types/formData";

interface CaptureDocumentProps {
  uploadingDocument: uploadingDocument;
  onCapture?: (file: File | null) => void;
  onDoctypeSelect: (type: IdentityDocType, uploadingDocument: uploadingDocument) => void;
}

const getTitle = (type: uploadingDocument) => {
  if (type === "identityDocument") return "Capture your ID document";
  return "Capture your proof of address document";
};

const getInstruction = (type: uploadingDocument) => {
  if (type === "identityDocument") return "Make sure your ID document is clear, centered, and all text is readable.";
  return "Make sure your proof of address document is clear, centered, and all text is readable.";
};

const CaptureDocument: React.FC<CaptureDocumentProps> = ({ uploadingDocument, onCapture, onDoctypeSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onCapture?.(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Camera capture logic would go here (e.g., using getUserMedia), but for now, just simulate
  const handleCaptureClick = () => {
    // Simulate camera capture (could open a modal or use webcam API)
    alert("Camera capture not implemented in this demo.");
  };

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">{getTitle(uploadingDocument)}</h2>
        <p className="text-center text-gray-600">{getInstruction(uploadingDocument)}</p>
      </div>
      {uploadingDocument === "identityDocument" && <SelectIdentityDocument onSelect={(type) => { onDoctypeSelect(type, uploadingDocument) }} />}
      <div className="flex flex-col items-center mb-6">
        <div className="w-full bg-gray-900 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-700 mb-4">
          <span className="text-4xl text-gray-400">
            <span role="img" aria-label="camera">📷</span>
          </span>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition mb-2"
          onClick={handleCaptureClick}
        >
          <span role="img" aria-label="camera">📷</span> Capture
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
          onClick={handleUploadClick}
        >
          <span role="img" aria-label="upload">📁</span> Upload
        </button>
        <input
          type="file"
          accept="image/*,application/pdf"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
};

export default CaptureDocument;
