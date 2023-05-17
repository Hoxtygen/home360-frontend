import {
  AdviceProps,
  BuildingPurpose,
  BuildingType,
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
export const buildingPurpose: SelectOption<BuildingPurpose>[] = [
  { label: "Rent", value: "rent" },
  { label: "Buy", value: "buy" },
  { label: "Build", value: "build" },
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
  { href: "/", title: "Search" },
  { href: "/", title: "Sell" },
  { href: "/", title: "Rent" },
  { href: "/", title: "Finance" },
  { href: "/", title: "Move" },
];

export const footerNavList = [
  { id: 1, href: "/", title: "About Us" },
  { id: 2, href: "/", title: "Contact Us" },
  { id: 3, href: "/", title: "Career" },
  { id: 4, href: "/", title: "Sitemap" },
  { id: 5, href: "/", title: "Developer" },
  { id: 6, href: "/", title: "Press Service" },
  { id: 7, href: "/", title: "Subscribe to Newsletter" },
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
