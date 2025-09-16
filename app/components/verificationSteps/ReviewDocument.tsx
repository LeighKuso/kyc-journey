import React from "react";

interface ReviewDocumentProps {
  documentType: "drivers_license" | "passport";
  imageUrl: string;
  onRetake: () => void;
  onConfirm: () => void;
}

const getTitle = (type: "drivers_license" | "passport") => {
  if (type === "drivers_license") return "Capture front of your license";
  return "Capture photo page of your passport";
};

const getInstruction = (type: "drivers_license" | "passport") => {
  if (type === "drivers_license") return "Make sure the document is clear, centered, and all text is readable.";
  return "Make sure the photo page is clear, centered, and all text is readable.";
};

const ReviewDocument: React.FC<ReviewDocumentProps> = ({ documentType, imageUrl, onRetake, onConfirm }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">{getTitle(documentType)}</h2>
        <p className="text-center text-gray-600">{getInstruction(documentType)}</p>
      </div>
      <div className="flex flex-col items-center mb-6">
        <img
          src={imageUrl}
          alt="Captured document"
          className="w-full h-48 object-cover rounded-lg mb-4 border"
        />
        <div className="flex w-full gap-4">
          <button
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition"
            onClick={onRetake}
          >
            <span role="img" aria-label="retake">🔄</span> Retake
          </button>
          <button
            className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            onClick={onConfirm}
          >
            <span role="img" aria-label="confirm">✔️</span> Looks Good
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDocument;
