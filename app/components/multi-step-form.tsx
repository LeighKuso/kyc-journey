import React, { useState } from "react";
import type FormData from "~/types/formData";
import type { AddressProofDocTypes, IdentityDocType } from "~/types/formData";

const identityDocTypes: Array<IdentityDocType> = [
  "South Africa ID",
  "Driving Licence",
  "Passport",
];
const addressProofTypes: Array<AddressProofDocTypes> = [
  "Utility Bill",
  "Bank Statement",
  "Rental Agreement",
];

const initialData: FormData = {
  firstName: "",
  lastName: "",
  identityType: "",
  identityFile: null,
  street: "",
  city: "",
  country: "",
  addressProofType: "",
  addressFile: null,
};

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : null }));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Firestore or backend
    alert("Form submitted!");
  };

  const steps = [
    "Personal Details",
    "Upload Identity Proof Document",
    "Identity Check - Live Selfie",
    "Address Details and Document Proof",
  ];

  // Determine completed steps
  const completed = [
    formData.firstName && formData.lastName,
    formData.identityType,
    formData.identityFile,
    formData.street && formData.city && formData.country,
    formData.addressProofType,
    formData.addressFile,
  ];

  return (
    <>
      <div className="flex justify-between mb-6 max-w-sm">
        {steps.map((label, idx) => (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-xs font-bold
                ${
                  idx < step
                    ? "bg-green-500 text-white"
                    : idx === step
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}>
              {completed[idx] ? "✓" : idx + 1}
            </div>
            <span className="text-xs text-center w-20">{label}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white rounded shadow">
        {step === 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Personal Details</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="input mb-2 w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="input mb-2 w-full"
              required
            />
            <input
              name="street"
              type="text"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="input mb-2 w-full"
              required
            />
            <input
              name="city"
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="input mb-2 w-full"
              required
            />
            <input
              name="country"
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="input mb-2 w-full"
              required
            />
            <button type="button" onClick={nextStep} className="btn">
              Next
            </button>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Proof of Identity</h2>
            <select
              name="identityType"
              value={formData.identityType}
              onChange={handleChange}
              className="input mb-2 w-full"
              required>
              <option value="">Select Document Type</option>
              {identityDocTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <h2 className="text-xl font-bold mb-2">Upload Identity Document</h2>
            <input
              type="file"
              name="identityFile"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="input mb-2 w-full"
              required
            />
            <button type="button" onClick={prevStep} className="btn mr-2">
              Back
            </button>
            <button type="button" onClick={nextStep} className="btn">
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Identity Verification</h2>
            {/* Placeholder for live selfie capture */}
            <button type="button" onClick={prevStep} className="btn mr-2">
              Back
            </button>
            <button type="button" onClick={nextStep} className="btn">
              Next
            </button>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Proof of Address</h2>
            <select
              name="addressProofType"
              value={formData.addressProofType}
              onChange={handleChange}
              className="input mb-2 w-full"
              required>
              <option value="">Select Proof of Address Type</option>
              {addressProofTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <h2 className="text-xl font-bold mb-2">Upload Proof of Address.</h2>
            <input
              type="file"
              name="addressFile"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="input mb-2 w-full"
              required
            />
            <button type="button" onClick={prevStep} className="btn mr-2">
              Back
            </button>
            {/* <button type="button" onClick={nextStep} className="btn">
              Next
            </button> */}
          </div>
        )}
      </form>
    </>
  );
};

export default MultiStepForm;
