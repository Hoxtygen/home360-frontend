import {
  AdviceProps,
  BuildingPurpose,
  BuildingType,
  BuildingTypeToBuy,
  SelectOption,
} from "typedef";

export const buildingType: SelectOption<BuildingType>[] = [
  {
    label: "Apartment",
    value: "apartment",
  },
  {
    label: "House",
    value: "house",
  },
  {
    label: "Temporary Living",
    value: "temp-living",
  },
  {
    label: "Shared Room",
    value: "shared-room",
  },
  {
    label: "Office",
    value: "office",
  },
  {
    label: "Hall",
    value: "hall",
  },
  {
    label: "Nursing Home",
    value: "nursing-home",
  },
];

export const buildingTypeToBuy: SelectOption<BuildingTypeToBuy>[] = [
  {
    label: "Apartment",
    value: "Apartment",
  },
  {
    label: "Hall",
    value: "Hall",
  },
  {
    label: "Hotel",
    value: "Hotel",
  },
  {
    label: "House",
    value: "House",
  },
  {
    label: "Office",
    value: "Office",
  },
];
export const buildingPurpose: SelectOption<BuildingPurpose>[] = [
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
];

export const advice: AdviceProps[] = [
  {
    title: "To Know",
    lesson: "All real estate guides",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-01x2.jpg",
  },
  {
    title: "Sell",
    lesson: "Real estate sales guide",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-01x22.jpg",
  },
  {
    title: "Rent",
    lesson: "Rental guide",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-02x2.jpg",
  },
  {
    title: "To Rent",
    lesson: "Rental guide",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-03x2.jpg",
  },
  {
    title: "Build",
    lesson: "House building guide",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-04x2.jpg",
  },
  {
    title: "Buy",
    lesson: "Real estate buying guide",
    href: "/",
    backgroundImage:
      "https://www.immobilienscout24.de/content/dam/is24/anbieten/bilder/wissen-hub/banner-visual-05x2.jpg",
  },
];
type NavLinks = Omit<AdviceProps, "lesson" | "backgroundImage">;
export const navList: NavLinks[] = [
  { href: "/search", title: "Search" },
  { href: "/", title: "Sell" },
  { href: "/", title: "Rent" },
  { href: "/", title: "Finance" },
  { href: "/", title: "Move" },
];

export const footerNavList = [
  { id: 1, href: "/", title: "About Us" },
  { id: 2, href: "/", title: "Contact Us" },
  { id: 3, href: "/", title: "Career" },
];

export const userInitialData = {
  token: "",
  user: {
    id: "",
    name: "",
    email: "",
  },
};

export const authLinks: NavLinks[] = [
  {
    href: "/login",
    title: "Login",
  },
  {
    href: "/signup",
    title: "Signup",
  },
];

export const authFooterLinks: NavLinks[] = [
  { href: "/", title: "Contact & Help" },
  { href: "/", title: "Imprint" },
  { href: "/", title: "Terms & Conditions & Legal Notices" },
  { href: "/", title: "Consumer Information" },
  { href: "/", title: "Data Protection" },
  { href: "/", title: "Security" },
];

export const facilityQuality = [
  {
    name: "facilityQuality",
    label: "Simple",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 rounded-sm inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
  {
    name: "facilityQuality",
    label: "Normal",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 rounded-sm inline-block border border-slate-300 dark:checked:bg- mt-5 w-full",
  },
  {
    name: "facilityQuality",
    label: "Upscale",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 rounded-sm inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
  {
    name: "facilityQuality",
    label: "Luxury",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 rounded-sm inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
];

export const petsAllowed = [
  {
    name: "petsAllowed",
    label: "Yes",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
  {
    name: "petsAllowed",
    label: "No",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
  {
    name: "petsAllowed",
    label: "According to arrangement",
    className: "hidden",
    labelClassName:
      "radio-label px-4 py-2 inline-block border border-slate-300 dark:checked:bg-black mt-5 w-full",
  },
];

export const apartmentDetails = [
  {
    name: "details",
    label: "Equipped kitchen",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border px-4 py-2 rounded-[50px] inline-block w-full",
  },
  {
    name: "details",
    label: "balcony/Terrace",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full ",
  },
  {
    name: "details",
    label: "Guest Toilet",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Garden/Joint use",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Basement/Cellar",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Suitable for shared flats",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Stepless access",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Elevator",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "details",
    label: "Reading room",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
];

export const apartmentType = [
  {
    label: "Not Specified",
    value: "not-specified",
  },
  {
    label: "Apartment",
    value: "apartment",
  },
  {
    label: "Attic",
    value: "attic",
  },
  {
    label: "Basement",
    value: "basement",
  },
  {
    label: "Duplex",
    value: "duplex",
  },
  {
    label: "Mezzanine",
    value: "mezzanine",
  },
  {
    label: "Ground floor Apartment",
    value: "ground-floor-apartment",
  },
  {
    label: "Loft",
    value: "loft",
  },
  {
    label: "Penthouse",
    value: "penthouse",
  },
  {
    label: "Terrace Apartment",
    value: "terrace-apartment",
  },
  {
    label: "Other",
    value: "other",
  },
];

export const applicationDocs = [
  {
    name: "applicationDocs",
    label: "Rent Payment confirmation",
    value: "rentPaymentConfirmation",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "applicationDocs",
    label: "Proof of Identity",
    value: "proofOfIdentity",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "applicationDocs",
    label: "Proof of Income",
    value: "proofOfIncome",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
  {
    name: "applicationDocs",
    label: "Credit Score",
    value: "credit score",
    className: "hidden",
    labelClassName:
      "checkbox-label border-slate-300 border rounded-[20px] px-4 py-2 w-full",
  },
];
export const SUPPORTED_FILE_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
