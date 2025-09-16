import { AddressProofDocTypes, IdentityDocType } from "./formData";

export class UserDoc {
  firstName: string | null;
  lastName: string | null;
  address: {
    street: string | null;
    city: string | null;
    country: string | null;
  };
  identityDocument: {
    docType: IdentityDocType | "";
    url: File | string | null;
    selfieVerified: boolean;
  };
  addressProof: {
    docType: AddressProofDocTypes | "";
    url: File | string | null;
  };
  verified: boolean;

  constructor(data: Partial<UserDoc> = {}) {
    this.firstName = data.firstName ?? null;
    this.lastName = data.lastName ?? null;
    this.address = data.address ?? { street: null, city: null, country: null };
    this.identityDocument = data.identityDocument ?? { docType: "", url: null, selfieVerified: false };
    this.addressProof = data.addressProof ?? { docType: "", url: null };
    this.verified = data.verified ?? false;
  }

  toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      identityDocument: this.identityDocument,
      addressProof: this.addressProof,
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
      identityDocument: doc.identityDocument ?? {
        docType: "",
        url: null,
        selfieVerified: false,
      },
      addressProof: doc.addressProof ?? {
        docType: "",
        url: null,
      },
      verified: doc.verified ?? false,
    });
  },
  toFirestore: (user: UserDoc) => {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      identityDocument: user.identityDocument,
      addressProof: user.addressProof,
      verified: user.verified,
    };
  },
};
