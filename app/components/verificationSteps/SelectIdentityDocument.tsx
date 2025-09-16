import React from "react";
import { IdentityDocType } from "~/types/formData";

interface SelectDocumentProps {
  onSelect: (type: IdentityDocType) => void;
}

const SelectIdentityDocument: React.FC<SelectDocumentProps> = ({ onSelect }) => {
  return (
    <div>
      <div className="mb-6">
        <p className="text-center text-gray-600">
          What type of documents do you want to use to verify your identity?
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => onSelect("South Africa ID")}>
          <span className="flex items-center gap-2">
            <span role="img" aria-label="South Africa ID" className="text-xl">🆔</span>
            <span>
              <span className="font-semibold">South Africa ID</span>
              <br />
              <span className="text-sm text-gray-500">Front and back</span>
            </span>
          </span>
        </button>
        <button
          className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => onSelect("Driving Licence")}
        >
          <span className="flex items-center gap-2">
            <span role="img" aria-label="ID" className="text-xl">🪪</span>
            <span>
              <span className="font-semibold">Driving Licence</span>
              <br />
              <span className="text-sm text-gray-500">Front and back</span>
            </span>
          </span>
        </button>
        <button
          className="w-full flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          onClick={() => onSelect("Passport")}
        >
          <span className="flex items-center gap-2">
            <span role="img" aria-label="Passport" className="text-xl">🛂</span>
            <span>
              <span className="font-semibold">Passport</span>
              <br />
              <span className="text-sm text-gray-500">Photo page</span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SelectIdentityDocument;
