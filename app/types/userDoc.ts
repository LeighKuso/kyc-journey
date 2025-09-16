import { AddressProofDocTypes, IdentityDocType } from "./formData";

export class UserDoc {
  firstName: string | null;
  lastName: string | null;
  address: {
    street: string | null;
    city: string | null;
    country: string | null;
  };
  documents: {
    identityDocument: {
      docType: IdentityDocType | "";
      url: File | string | null;
      selfieVerified: boolean;
    };
    addressProof: {
      docType: AddressProofDocTypes | "";
      url: File | string | null;
    };
  };
  verified: boolean;

  constructor(data: Partial<UserDoc> = {}) {
    this.firstName = data.firstName ?? null;
    this.lastName = data.lastName ?? null;
    this.address = data.address ?? { street: null, city: null, country: null };
    this.documents = data.documents ?? {
      identityDocument: { docType: "", url: null, selfieVerified: false },
      addressProof: { docType: "", url: null },
    };
    this.verified = data.verified ?? false;
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      documents: this.documents,
      verified: this.verified,
    };
  }
}

export const userConverter = {
  fromFirestore(snapshot: any, options: any): UserDoc {
    const doc = snapshot.data(options);
    return new UserDoc({
      firstName: doc.firstName ?? null,
      lastName: doc.lastName ?? null,
      address: doc.address ?? { street: null, city: null, country: null },
      documents: doc.documents ?? {
        identityDocument: { docType: "", url: null, selfieVerified: false },
        addressProof: { docType: "", url: null },
      },
      verified: doc.verified ?? false,
    });
  },
  toFirestore: (user: UserDoc) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      documents: user.documents,
      verified: user.verified,
    };
  },
};
