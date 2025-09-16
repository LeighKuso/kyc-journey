import { doc, DocumentReference, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { fbStore } from "~/firebase/firebaseConfig";
import { userConverter, UserDoc } from "~/types/userDoc";

interface PersonalDetailsFormProps {
  initialData?: UserDoc | null;
  docRef?: DocumentReference<UserDoc> | null;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ initialData, docRef }) => {
  const [form, setForm] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    street: initialData?.address.street || "",
    city: initialData?.address.city || "",
    country: initialData?.address.country || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (docRef) {
      setDoc(docRef, new UserDoc({ firstName: form.firstName, lastName: form.lastName, address: { street: form.street, city: form.city, country: form.country } }), { merge: true });
    }
  };

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">First Name</label>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Street</label>
        <input
          type="text"
          name="street"
          value={form.street}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">City</label>
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
