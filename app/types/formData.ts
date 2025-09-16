export type IdentityDocType =
  | "South Africa ID"
  | "Driving Licence"
  | "Passport";
export type AddressProofDocTypes =
  | "Utility Bill"
  | "Bank Statement"
  | "Rental Agreement";

export default interface FormData {
  firstName: string;
  lastName: string;
  identityType: IdentityDocType | "";
  identityFile: File | null;
  street: string;
  city: string;
  country: string;
  addressProofType: AddressProofDocTypes | "";
  addressFile: File | null;
}
